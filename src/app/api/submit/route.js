export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, businessName, website, industry } = body;

    const API_KEY = process.env.GLOBALCONTROL_API_KEY;
    const TAG_ID = process.env.GLOBALCONTROL_TAG_AEO_AUDIT;
    const COMPANY_FIELD = process.env.GLOBALCONTROL_CUSTOM_FIELD_COMPANY;
    const INDUSTRY_FIELD = process.env.GLOBALCONTROL_CUSTOM_FIELD_INDUSTRY;
    const WEBSITE_FIELD = process.env.GLOBALCONTROL_CUSTOM_FIELD_WEBSITE;

    // Split name into first and last
    const nameParts = name.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    // 1. Create contact in Global Control
    const contactResponse = await fetch('https://api.globalcontrol.io/api/ai/contacts', {
      method: 'POST',
      headers: {
        'X-API-KEY': API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        customFields: [
          { customFieldId: COMPANY_FIELD, value: businessName },
          { customFieldId: INDUSTRY_FIELD, value: industry },
          { customFieldId: WEBSITE_FIELD, value: website },
        ],
      }),
    });

    const contactData = await contactResponse.json();

    if (contactData.type === 'error') {
      console.error('Contact creation error:', contactData.error);
      return Response.json({ success: false, error: 'Failed to create contact' }, { status: 500 });
    }

    const contactId = contactData.data._id;

    // 2. Fire the "AEO Audit Requested" tag
    const tagResponse = await fetch(`https://api.globalcontrol.io/api/ai/tags/fire-tag/${TAG_ID}`, {
      method: 'POST',
      headers: {
        'X-API-KEY': API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ contactId }),
    });

    const tagData = await tagResponse.json();

    if (tagData.type === 'error') {
      console.error('Tag firing error:', tagData.error);
      // Don't fail the whole request if tag firing fails
    }

    return Response.json({ 
      success: true, 
      contactId,
      message: 'AEO audit request submitted successfully'
    });

  } catch (error) {
    console.error('Submit error:', error);
    return Response.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
