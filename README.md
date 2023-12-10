## OFAC Individual Matcher

This project is a webpage where a user can check if a individual is contained in the OFAC Specially Designated Nationals (SDN) list (using the api https://ofac-api.com/documentation/v3/index.html)

A user inputs a name, date of birth, and country, and the webapp will check if there is a partial or full match and display to the user

## Going further

Several things can be added to this, such as more fields to query, a option to query less fields, the option to query multiple values of the same field, the capability to save previous matches.

## Project info

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

The Next.js serverless functions are stored in the /api directory.


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.