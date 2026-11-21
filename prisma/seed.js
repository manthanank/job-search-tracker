const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding job-search-tracker PostgreSQL database...');

  const companiesData = [
    {
      name: 'Stripe',
      website: 'https://stripe.com',
      location: 'San Francisco, CA / Remote',
      applications: [
        {
          roleTitle: 'Staff Software Engineer - Financial Infrastructure',
          stage: 'TECHNICAL_INTERVIEW',
          jobType: 'REMOTE',
          location: 'San Francisco, CA / Remote',
          salaryMin: 220000,
          salaryMax: 260000,
          currency: 'USD',
          notes: 'Passed behavioral screening and tech architecture screen. System design interview scheduled for next round.',
          rating: 5,
        }
      ]
    },
    {
      name: 'Vercel',
      website: 'https://vercel.com',
      location: 'Remote (Worldwide)',
      applications: [
        {
          roleTitle: 'Senior Solutions Architect - Next.js Enterprise',
          stage: 'SCREENING',
          jobType: 'REMOTE',
          location: 'Remote (Worldwide)',
          salaryMin: 180000,
          salaryMax: 215000,
          currency: 'USD',
          notes: 'Initial recruiter call scheduled. Need to prepare portfolio demo of Turbopack and Edge Middleware.',
          rating: 4,
        }
      ]
    },
    {
      name: 'Figma',
      website: 'https://figma.com',
      location: 'New York, NY / Hybrid',
      applications: [
        {
          roleTitle: 'Senior Frontend Engineer - Collaboration Engine',
          stage: 'APPLIED',
          jobType: 'HYBRID',
          location: 'New York, NY / Hybrid',
          salaryMin: 175000,
          salaryMax: 205000,
          currency: 'USD',
          notes: 'Application submitted via referral from Sarah M. Follow-up reminder set.',
          rating: 4,
        }
      ]
    },
    {
      name: 'Datadog',
      website: 'https://datadoghq.com',
      location: 'Boston, MA / Remote',
      applications: [
        {
          roleTitle: 'Principal Cloud Systems Engineer',
          stage: 'OFFER',
          jobType: 'REMOTE',
          location: 'Boston, MA / Remote',
          salaryMin: 240000,
          salaryMax: 280000,
          currency: 'USD',
          notes: 'Offer letter received! Reviewing equity vesting schedule and compensation package with mentor.',
          rating: 5,
        }
      ]
    }
  ];

  for (const c of companiesData) {
    const company = await prisma.company.upsert({
      where: { id: c.name.toLowerCase() },
      update: {},
      create: {
        id: c.name.toLowerCase(),
        name: c.name,
        website: c.website,
        location: c.location,
      }
    });

    for (const app of c.applications) {
      await prisma.jobApplication.create({
        data: {
          companyId: company.id,
          roleTitle: app.roleTitle,
          stage: app.stage,
          jobType: app.jobType,
          location: app.location,
          salaryMin: app.salaryMin,
          salaryMax: app.salaryMax,
          currency: app.currency,
          notes: app.notes,
          rating: app.rating,
          appliedDate: new Date(),
        }
      });
    }
  }

  const count = await prisma.jobApplication.count();
  console.log(`Successfully seeded job-search-tracker! Total applications in DB: ${count}`);
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
