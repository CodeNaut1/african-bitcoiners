const R2 = 'https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev'

export const IMG = {
  logo: `${R2}/uploads/2024/10/African-Bitcoiners-official_logo-1024x1024.png`,
}

export const LINKS = {
  abubakar: 'https://x.com/ihate1999',
  btrustBuilders: 'https://www.btrust.tech/builders',
  btrust: 'https://www.btrust.tech/',
  btrustGrants: 'https://btrust.tech/',
  africanBitcoiners: '/',
  africaFreeRouting: 'https://freerouting.africa/',
  website: '/',
}

export const CONTACTS = {
  sarah: {
    name: 'Sarah White',
    org: 'African Bitcoiners',
    email: 'sarahwhite@bitcoiners.africa',
  },
  megasley: {
    name: 'Megasley',
    org: 'Africa Free Routing',
    email: 'megasley@freerouting.africa',
  },
}

export const ARTICLE_HTML = `
<p>Btrust, a non-profit organization focused on decentralizing open-source Bitcoin development, has awarded a grant to African Bitcoiners&rsquo; subsidiary, Africa Free Routing, to support five Bitcoin Lightning-focused developer bootcamps across the continent in 2025.</p>
<p>This grant marks a significant step in accelerating <strong>Bitcoin development</strong> <strong>talent</strong> across Africa by specifically onboarding <strong>non-Bitcoin developers</strong> into the ecosystem. With this support, Africa Free Routing will run high-intensity, Lightning-focused bootcamps in key regions, equipping developers with practical tools, mentorship, and pathways into open-source Bitcoin contribution; while also catalyzing the creation of Africa-focused Lightning infrastructure.</p>
<p>&ldquo;We&rsquo;re thrilled to support Africa Free Routing in expanding access to high-quality Bitcoin developer education,&rdquo; said <strong><a href="${LINKS.abubakar}" target="_blank" rel="noopener noreferrer">Abubakar Nur Khalil</a>, CEO of Btrust.</strong> &ldquo;These bootcamps are a vital step toward ensuring an essential segment of African developers have the tools and support to start their careers in Bitcoin open-source and shape Bitcoin&rsquo;s future.&rdquo;</p>
<p>The five Lightning Development Bootcamps will take place across different African regions, with a focus on building strong local developer communities, increasing participation in global Bitcoin projects, and expanding technical capacity across the continent. Participants will also be funneled into long-term mentorship networks such as <strong><a href="${LINKS.btrustBuilders}" target="_blank" rel="noopener noreferrer">Btrust Builders</a></strong> for continued growth and contribution.</p>
<p>This collaboration reflects a shared belief in <strong>decentralized development, global collaboration,</strong> and the power of <strong>open-source education</strong> to drive freedom and opportunity.</p>
<p><strong>About Btrust</strong><br /><a href="${LINKS.btrust}" target="_blank" rel="noopener noreferrer">Btrust</a> is a non-profit organization with a dedicated mission to decentralize the development of Bitcoin software. Their focus is on fostering developer talent in the Global South and supporting the free and open-source Bitcoin ecosystem.</p>
<p>Learn more about Btrust and its grant programs <a href="${LINKS.btrustGrants}" target="_blank" rel="noopener noreferrer">here.</a></p>
<p><strong>About African Bitcoiners</strong></p>
<p><a href="${LINKS.africanBitcoiners}">African Bitcoiners</a> is a Bitcoin community helping to onboard new African users and guide them safely on their Bitcoin journey from earning sats to self-custody.</p>
<p>Learn more about <a href="${LINKS.africanBitcoiners}">African Bitcoiners.</a></p>
<p><strong>About Africa Free Routing</strong></p>
<p><a href="${LINKS.africaFreeRouting}" target="_blank" rel="noopener noreferrer">Africa Free Routing</a> is an initiative under African Bitcoiners that runs education, infrastructure, and development programs to onboard Africans into Bitcoin. Its mission is to provide accessible, peer-to-peer tools and training for individuals and communities to engage with Bitcoin meaningfully.</p>
<p>Learn more about <a href="${LINKS.africaFreeRouting}" target="_blank" rel="noopener noreferrer">Africa Free Routing.</a></p>
`.trim()
