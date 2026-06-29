import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import {
  BAD_PRACTICES,
  EXTRA_SECURITY_TIPS,
  IMG,
  KEY_SAFETY_TIPS,
  LINKS,
  MNEMONIC_STEPS,
  PAPER_WALLET_GENERATORS,
  PAPER_WALLET_STEPS,
} from '@/components/ColdStoragePage/data'
import { JobsUpskillForm } from '@/components/forms/JobsUpskillForm'

const CREAM = '#FEF6EC'
const FEEDBACK_CREAM = '#FFF3EA'
const HEADING = '#4D3727'
const TEXT = '#4D3727'
const ORANGE = '#E1640C'
const ORANGE_LINK = '#ff9500'
const BOUNTY_BTN = '#F45341'

function ContentSection({
  children,
  className = '',
  maxWidth = '850px',
}: {
  children: React.ReactNode
  className?: string
  maxWidth?: '800px' | '850px' | '950px' | '1000px'
}) {
  return (
    <section className={`px-4 py-5 sm:px-6 md:py-[25px] md:pb-[50px] ${className}`} style={{ backgroundColor: CREAM }}>
      <div className="mx-auto px-0" style={{ maxWidth }}>
        {children}
      </div>
    </section>
  )
}

function SectionTitle({ children, centered }: { children: React.ReactNode; centered?: boolean }) {
  return (
    <h4
      className={`mb-6 font-heading text-[32px] font-black leading-[35px] tracking-[-0.4px] md:text-[35px] md:leading-[30px] ${
        centered ? 'text-center' : 'text-left'
      }`}
      style={{ color: HEADING }}
    >
      {children}
    </h4>
  )
}

function BodyText({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`text-lg leading-[30px] tracking-[-0.4px] ${className}`} style={{ color: TEXT }}>
      {children}
    </p>
  )
}

function OrangeTextLink({ href, external, children }: { href: string; external?: boolean; children: React.ReactNode }) {
  const className = 'underline transition-colors hover:text-black'
  const style = { color: ORANGE_LINK }
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className} style={style}>
        {children}
      </a>
    )
  }
  return (
    <Link href={href} className={className} style={style}>
      {children}
    </Link>
  )
}

function OutlineButton({ href, children, external }: { href: string; children: React.ReactNode; external?: boolean }) {
  const className =
    'inline-block border px-[85px] py-[15px] text-[17px] font-bold tracking-[-0.4px] transition-colors hover:bg-[#E1640C] hover:text-white'
  const style = { borderColor: ORANGE, color: ORANGE }
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className} style={style}>
        {children}
      </a>
    )
  }
  return (
    <Link href={href} className={className} style={style}>
      {children}
    </Link>
  )
}

function NumberedList({ items }: { items: (string | { text: string; href?: string })[] }) {
  return (
    <ul className="mb-6 list-none space-y-3 p-0">
      {items.map((item, i) => (
        <li key={i} className="text-lg leading-[30px] tracking-[-0.4px]" style={{ color: TEXT }}>
          {typeof item === 'string' ? (
            <>
              {i + 1}.{' '}
              {item.includes(':') ? (
                <>
                  <strong>{item.slice(0, item.indexOf(':') + 1)}</strong>
                  {item.slice(item.indexOf(':') + 1)}
                </>
              ) : (
                item
              )}
            </>
          ) : (
            <>
              {i + 1}.{' '}
              {item.href ? (
                <OrangeTextLink href={item.href} external>
                  {item.text}
                </OrangeTextLink>
              ) : (
                item.text
              )}
            </>
          )}
        </li>
      ))}
    </ul>
  )
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="list-none space-y-3 p-0">
      {items.map((item) => (
        <li key={item.slice(0, 24)} className="flex gap-3 text-lg leading-[30px] tracking-[-0.4px]" style={{ color: TEXT }}>
          <span className="mt-2.5 h-[6px] w-[6px] shrink-0 rounded-full bg-[#4D3727]" aria-hidden />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function ContentImage({ src, alt, width, height }: { src: string; alt: string; width: number; height: number }) {
  return (
    <div className="my-6 flex justify-center">
      <Image src={src} alt={alt} width={width} height={height} className="h-auto max-w-full" />
    </div>
  )
}

export function ColdStoragePage() {
  return (
    <div className="font-body" style={{ backgroundColor: CREAM }}>
      <section className="px-4 pt-[60px] sm:px-6 md:pt-[60px]" style={{ backgroundColor: CREAM }}>
        <div className="mx-auto max-w-[800px] text-center">
          <h1
            className="font-heading text-[42px] font-black leading-[55px] tracking-[-0.4px] md:text-[50px] md:leading-[65px]"
            style={{ color: HEADING }}
          >
            How to Set Up Your Bitcoin Cold Storage for FREE!
          </h1>
        </div>
      </section>

      <section className="px-4 py-5 sm:px-6 md:pb-5" style={{ backgroundColor: CREAM }}>
        <div className="mx-auto max-w-[1000px]">
          <ContentImage src={IMG.hero} alt="Setting up a Bitcoin cold storage" width={1440} height={786} />
        </div>
      </section>

      <ContentSection>
        <SectionTitle>What is a Bitcoin wallet ?</SectionTitle>
        <BodyText className="mb-4">
          A Bitcoin wallet is software that runs on a computer, smartphone, or smart hardware device and provides a
          secure way to store, send, and receive Bitcoin. There are three major types of Bitcoin wallets: hardware,
          software, and paper wallets. Hardware wallets are physical digital devices that store private keys away from
          the internet. Software wallets allow you to store private keys on a computer or mobile device (
          <OrangeTextLink href={LINKS.wallets}>see our wallets page</OrangeTextLink>) and paper wallets are wallets
          that involve writing or imprinting private keys onto something offline, like a piece of paper or even metal,
          making them secure from hacking attempts.
        </BodyText>
        <BodyText>
          Bitcoin cold storage is the practice of storing Bitcoin holdings in a secure offline wallet. This method of
          storage is commonly used by long-term savers who want to keep their Bitcoin safe. The best cold storage
          devices are hardware wallets, but they can be pretty pricey for Africans to get their hands on. The most
          affordable way to store your Bitcoin offline is by using software wallets or generating paper wallets offline.
        </BodyText>
      </ContentSection>

      <ContentSection>
        <SectionTitle>What are Private Keys?</SectionTitle>
        <ContentImage src={IMG.privateKey} alt="Bitcoin private key" width={380} height={380} />
        <BodyText className="mb-4">
          Your private key is a series of random looking letters and numbers that give you control over the Bitcoin in
          your Bitcoin address. It is used to prove ownership of the Bitcoin in your Bitcoin address and used to create
          the signatures that permit you to spend your Bitcoin.
        </BodyText>
        <BodyText className="mb-4">
          Modern self-custodial wallets use seed phrases that simplify the process of generating and accessing bitcoin
          wallets by implementing the BIP 39 protocol, which allows users to use a set of natural language words to
          access their Bitcoin wallet instead of a complicated private key. For additional wallet security, the BIP
          39 protocol has an optional, advanced feature that allows you to create a passphrase that is used together with
          your seed phrase to access the Bitcoin in your wallet.
        </BodyText>
        <BodyText>
          And so if you create a self-custodial wallet using software like{' '}
          <OrangeTextLink href={LINKS.sparrow} external>
            Sparrow Wallet
          </OrangeTextLink>{' '}
          and write down your Bitcoin address and private keys or seed phrase and paraphrase on a piece of paper, this
          automatically becomes a paper wallet, the same way a paper wallet generated online and copied out is also a
          paper wallet. Because a paper wallet is simply your Bitcoin address and private key or seed phrase written on
          a piece of paper, and as long as you have that piece of paper, you can always access the Bitcoin in that
          wallet.
        </BodyText>
      </ContentSection>

      <ContentSection>
        <SectionTitle>Paper Wallet</SectionTitle>
        <ContentImage src={IMG.paperWallet} alt="Bitcoin paper wallet" width={471} height={446} />
        <BodyText>
          Paper wallets are a form of cold storage where Bitcoin private keys are printed or copied on paper, which
          oftentimes also includes the wallet address. Paper wallets enable you to store your Bitcoin safely offline.
          This makes paper wallets significantly more secure compared to hot wallets, which are accessible online and
          vulnerable to hacking and theft.
          <br />
          <br />
          Creating a paper wallet is a simple and inexpensive way to store your Bitcoin offline and keep them safe.
          <br />
          <br />
          There are many paper wallet generators available online, but not all of them are trustworthy. It&apos;s
          important to choose a reputable one that has been around for a while and has a good reputation in the Bitcoin
          community. Some popular paper wallet generators include:
        </BodyText>
      </ContentSection>

      <ContentSection>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          {PAPER_WALLET_GENERATORS.map((gen) => (
            <div key={gen.title}>
              <SectionTitle>{gen.title}</SectionTitle>
              <BodyText className="mb-6">{gen.text}</BodyText>
              <div className="text-center md:text-left">
                <OutlineButton href={gen.href} external>
                  Visit
                </OutlineButton>
              </div>
            </div>
          ))}
        </div>
      </ContentSection>

      <ContentSection>
        <SectionTitle>How to create your Paper Wallet</SectionTitle>
        <NumberedList items={PAPER_WALLET_STEPS} />
        <BodyText className="mb-4">When this is all done, ensure you close the browser before going back online.</BodyText>
        <BodyText className="mb-4">
          <strong>N.B:</strong> For ultra secure Bitcoin paper wallets, you need to download the paper wallet generator
          software onto a clean and secure computer. Make sure to check the website&apos;s security certificate to ensure
          that it&apos;s legitimate.
        </BodyText>
        <BodyText className="mb-4">
          For Bitcoin cold storage using software, we advise you to{' '}
          <OrangeTextLink href={LINKS.wallets}>
            check out our wallet page for self-custodial wallet options.
          </OrangeTextLink>
        </BodyText>
        <BodyText className="mb-4">Watch this video on</BodyText>
        <OutlineButton href={LINKS.paperWalletVideo} external>
          How to create a super secure Bitcoin paper wallet
        </OutlineButton>
      </ContentSection>

      <ContentSection>
        <SectionTitle>How to Generate a Mnemonic Seed Phrase</SectionTitle>
        <ContentImage src={IMG.mnemonic} alt="Mnemonic seed phrase" width={459} height={405} />
        <BodyText className="mb-4">
          Bitcoin paper wallet generators will most likely give you a long string of letters and numbers as a private
          key, and this is usually difficult to memorise. What if we told you there was a cool way to generate a seed
          phrase from that private key?
        </BodyText>
        <BodyText className="mb-4">
          <strong>
            To convert a Bitcoin private key into a 12 or 24-word mnemonic phrase, you can use a tool called a mnemonic
            converter or a seed phrase generator.
          </strong>
        </BodyText>
        <BodyText className="mb-6">
          Here&apos;s how you can use the BIP39 tool to convert your Bitcoin private key into a 12 or 24-word phrase:
        </BodyText>
        <NumberedList items={MNEMONIC_STEPS} />
        <BodyText className="mb-4">
          <strong>
            There you have it! You can then use this mnemonic phrase to restore your Bitcoin wallet in case you lose
            your private key.
          </strong>
        </BodyText>
        <BodyText>
          It&apos;s important to note that once you have generated your mnemonic phrase, you should keep it secure and
          private, as anyone who has access to it can potentially access your Bitcoin wallet.
        </BodyText>
      </ContentSection>

      <ContentSection>
        <SectionTitle>How to Keep Secret and Safely Store Your Keys</SectionTitle>
        <ContentImage src={IMG.keysSafe} alt="Keeping your keys safe" width={459} height={424} />
        <BodyText className="mb-4">
          Remember that your keys can be a long string of numbers and alphabets or the more modern BIP 39
          protocol-generated seed phrase and paraphrase; they are the most important aspect of a paper wallet. So it is
          important to take steps to keep it safe and secure because if you lose your keys, you lose access to your
          Bitcoin and if someone gets their hands on your keys, they can easily steal your funds.
        </BodyText>
        <BodyText className="mb-6">
          Luckily, there are some easy steps you can take to make sure your keys are as safe as possible. Here are some
          tips for creating and storing your paper wallet:
        </BodyText>
        <BulletList items={KEY_SAFETY_TIPS} />
      </ContentSection>

      <ContentSection>
        <SectionTitle>Seed Phrase Security Bad Practices</SectionTitle>
        <BulletList items={BAD_PRACTICES} />
      </ContentSection>

      <ContentSection>
        <SectionTitle>For extra security</SectionTitle>
        <BulletList items={EXTRA_SECURITY_TIPS} />
        <BodyText className="mb-4 mt-6">Watch this video on</BodyText>
        <OutlineButton href={LINKS.seedPhraseVideo} external>
          How to Backup and Store Your Crypto Seed Phrase
        </OutlineButton>
      </ContentSection>

      <ContentSection className="md:pb-5" maxWidth="850px">
        <h4
          className="text-left font-heading text-[30px] font-extrabold leading-[35px] tracking-[-0.4px] md:text-[34px]"
          style={{ color: HEADING }}
        >
          To learn more about Bitcoin wallets and how to setup one, Sign up for our FREE Bitcoin for Beginners Course
        </h4>
      </ContentSection>

      <section className="px-4 pb-[100px] pt-5 sm:px-6 md:pb-[150px]" style={{ backgroundColor: CREAM }}>
        <div className="mx-auto max-w-[950px]">
          <div className="rounded-[5px] border border-[#60391333] bg-white px-6 py-10 sm:px-10 md:px-[55px] md:py-[55px]">
            <h4
              className="text-center font-heading text-[26px] font-black tracking-[-0.6px] md:text-[32px]"
              style={{ color: '#59462E' }}
            >
              Sign up to take the Course for <span style={{ color: '#EC6744' }}>free</span>
            </h4>
            <div className="mt-8">
              <JobsUpskillForm />
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-[60px] pb-[100px] sm:px-6 max-md:py-[30px]" style={{ backgroundColor: FEEDBACK_CREAM }}>
        <div className="mx-auto max-w-[600px] text-center">
          <h4 className="font-heading text-2xl font-bold tracking-[-0.8px] max-md:leading-10" style={{ color: '#2D1300' }}>
            Get 1,000 sats for your brilliant ideas!
          </h4>
          <p className="mt-4 text-lg leading-7 tracking-[-0.5px]" style={{ color: '#2D1300' }}>
            Have a genius idea or spot something in our African Bitcoiners initiatives that could be even better? Submit
            your feedback to us and we&apos;re excited to reward you for them.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href={LINKS.feedbackBounty}
              className="inline-block rounded px-20 py-[15px] text-[17px] font-semibold tracking-[-0.2px] text-white shadow-[2px_4px_8px_rgba(0,0,0,0.2)] transition-colors hover:bg-[#253343] max-md:px-20 max-md:py-[18px]"
              style={{ backgroundColor: BOUNTY_BTN }}
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
