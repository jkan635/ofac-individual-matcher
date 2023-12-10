import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    const params = request.nextUrl.searchParams;
    const name = params.get("name");
    const dob = params.get("dob");
    const country = params.get("country");

    if (!name || !dob || !country) {
        return NextResponse.json({ error: "Request missing params" }, { status: 400 })
    }

    const requestBody = {
        "apiKey": "0f70a0f2-33d9-4263-9d81-105068c20bd9", // Normally this would be stored in the enviroment or somewheres else
        "cases": [{
            "name": name,
            "dob": dob,
            "citizenship": country
        }]
    }
    const options = {
        method: 'POST',
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody)
    };
    const resp = await fetch('https://search.ofac-api.com/v3', options);
    const json = await resp.json();
    const matchesForUser = json.matches[name];
    return NextResponse.json({ matches: matchesForUser }, { status: 200 });
}