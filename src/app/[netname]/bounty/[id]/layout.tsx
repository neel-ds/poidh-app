import { Metadata } from 'next';
import * as React from 'react';
import { fetchBountyById } from '@/app/context/web3';
import '@/styles/colors.css';
import { connectToDatabase } from '@/database/';
import Bounty from '@/database/models/bounty.model';

type Props = {
  params: { id: string; netname: string };
};

function weiToEther(weiValue: string | number | bigint): string {
  const etherValue = Number(weiValue) / 1e18;
  return etherValue.toFixed(6);
}

async function addToMongodb(bountyObject: any): Promise<void> {
  try {
    await connectToDatabase();

    bountyObject.amount = String(bountyObject.amount);
    bountyObject.createdAt = String(bountyObject.createdAt);
    const bountyData = await Bounty.create(bountyObject);
  } catch (error) {
    console.error('Error creating bounty model:', error);
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const id = params.id;
  let netName = params.netname;

  if (
    !netName ||
    netName === '' ||
    netName == 'arbitrum' ||
    netName == 'base'
  ) {
    netName = 'eth';
  }

  // fetch data
  const bountyData = await fetchBountyById(id);

  await addToMongodb(bountyData);

  return {
    title: bountyData.name,
    description:
      weiToEther(bountyData.amount) + ` ${netName} ` + bountyData.description,

    openGraph: {
      title: bountyData.name,
      description:
        weiToEther(bountyData.amount) + ` ${netName} ` + bountyData.description,
      siteName: 'POIDH',
      images: [`https://poidh.xyz/images/poidh-preview-hero.png`],
      type: 'website',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: bountyData.name,
      description:
        weiToEther(bountyData.amount) + ` ${netName} ` + bountyData.description,
      images: [`https://poidh.xyz/images/poidh-preview-hero.png`],
    },
  };
}

export default function BountyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
