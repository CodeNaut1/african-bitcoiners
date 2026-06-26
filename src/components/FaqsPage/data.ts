const R2 = 'https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev'

export const IMG = {
  heroBg: `${R2}/uploads/2024/11/African-Bitcoiners-Frequently-Asked-Questions-Hero.png`,
  avatars: `${R2}/uploads/2024/11/Avatar-group-Icon-Image.png`,
} as const

export const EMAIL = 'hello@bitcoiners.africa'

export const FAQ_ITEMS = [
  {
    question: 'What is Bitcoin?',
    answerHtml: `<p>Bitcoin is a digital currency that uses cryptography for security and operates on a decentralized blockchain network. Unlike traditional currencies, they aren't controlled by any government or bank, which allows for greater freedom and accessibility. Learn more about Bitcoin with our free <a href="/learn-bitcoin/free-bitcoin-course">Bitcoin for Beginners Course.</a></p>`,
  },
  {
    question: 'How does Bitcoin benefit Africa?',
    answerHtml: `<p>In Africa, Bitcoin functions similarly to how it does globally, but it's particularly noted for:</p><ul><li><strong>Lower Transaction Fees:</strong> Bitcoin transactions often have lower fees compared to traditional banking methods, which is beneficial for cross-border transfers.</li><li><strong>No Need for Intermediaries:</strong> Transactions can be peer-to-peer, reducing the need for banks or other financial institutions, which can be limited in some African regions</li></ul>`,
  },
  {
    question: 'How does Bitcoin compare to traditional banking systems in Africa?',
    answerHtml: `<p>Bitcoin provides a decentralized alternative to traditional banking, allowing users to store and transfer value without relying on banks. Unlike banks, Bitcoin transactions don't require identity verification, which can be beneficial in underserved areas. However, the absence of regulation means that users are fully responsible for their funds, with no recourse if they lose access or fall victim to fraud.</p>`,
  },
  {
    question: 'Are there local businesses that accept Bitcoin as payment?',
    answerHtml: `<p>Yes, an increasing number of businesses in Africa accept Bitcoin, particularly in tech hubs like Lagos, Cape Town, and Nairobi. Some restaurants, hotels, and e-commerce stores now accept Bitcoin, but it remains a niche payment method. Find businesses in your area that accept Bitcoin <a href="/spend-bitcoin/bitcoiners-map">here.</a></p>`,
  },
  {
    question: 'How is Bitcoin being used in Africa?',
    answerHtml: `<ul><li><strong>Commerce and Trades:</strong> Some businesses, particularly those dealing internationally, like the example of a mobile phone seller in Lagos paying suppliers in Bitcoin, use it to bypass currency conversion and high transfer fees.</li><li><strong>Remittances:</strong> Africans abroad use Bitcoin to send money back home, often finding it quicker and sometimes cheaper than traditional money transfer services.</li><li><strong>Savings and Store of Value: </strong>In countries with high inflation or where the local currency has devalued significantly, Bitcoin serves as an alternative savings or a hedge against inflation.</li></ul>`,
  },
  {
    question: 'Is Bitcoin legal in Africa?',
    answerHtml: `<p>The legal status of Bitcoin in Africa varies significantly across countries:</p><ul><li><strong>Legal and Regulated:</strong> Some nations permit Bitcoin use with established regulations. For instance, South Africa allows Bitcoin transactions and has implemented guidelines to oversee its use.</li><li><strong>Restricted or Banned: </strong>Several countries have imposed restrictions or outright bans on Bitcoin. In Nigeria, the Central Bank prohibited financial institutions from facilitating Bitcoin transactions, effectively limiting Bitcoin's use. Similarly, Algeria and Morocco have banned Bitcoin activities</li><li><strong>Unregulated or Ambiguous:</strong> In many African countries, Bitcoin operates in a legal gray area without specific regulations. This lack of clarity can pose risks for users and businesses involved in Bitcoin activities.</li></ul>`,
  },
  {
    question: 'What are the challenges of using Bitcoin in Africa?',
    answerHtml: `<ul><li><strong>Regulation:</strong> Many African countries lack clear regulations, which can lead to uncertainty or risk for users and businesses.</li><li><strong>Volatility:</strong> Bitcoin's price volatility can be a significant risk for those using it as a currency rather than an investment.</li><li><strong>Infrastructure:</strong> Internet connectivity, necessary for Bitcoin transactions, can be unreliable or expensive in some regions.<br />Education: There's a need for more education about Bitcoin to avoid scams and ensure safe usage.</li></ul>`,
  },
  {
    question: 'How can one start using Bitcoin in Africa?',
    answerHtml: `<ul><li><strong>Exchanges:</strong> Platforms like Binance, Luno, and LocalBitcoins facilitate buying, selling, and trading Bitcoin. However, availability might vary by country due to regulatory environments.</li><li><strong>Wallets:</strong> Users can store Bitcoin in digital wallets, which can be software-based (on a computer or mobile device) or hardware-based for increased security.</li></ul>`,
  },
  {
    question: 'How can I buy Bitcoin in my country?',
    answerHtml: `<p>To buy Bitcoin, you can use P2P platforms that operate in your region. Many platforms allow you to buy Bitcoin with local currency through bank transfers, mobile money, or debit cards. Peer-to-peer platforms are also popular as they connect buyers and sellers directly, often allowing for cash payments. Check out our list of places to buy Bitcoin peer-to-peer in Africa.</p>`,
  },
  {
    question: 'What are the risks associated with saving in Bitcoin?',
    answerHtml: `<p>Bitcoin is a highly volatile asset, meaning its value can fluctuate dramatically in short periods. Other risks include regulatory changes, security threats like hacks or scams, and loss of access if you lose your private keys or wallet. As with any investment, it's essential to research thoroughly and invest only what you can afford to lose.</p>`,
  },
  {
    question: 'How can I store my Bitcoin safely?',
    answerHtml: `<p>You can store Bitcoin in various types of wallets, including hardware wallets, mobile wallets, or desktop wallets. Hardware wallets are considered the safest as they store your private keys offline, protecting against hacking. Always secure your wallet with strong passwords and enable two-factor authentication where possible. Check out our list of recommender software and hardware wallets for Africans.</p>`,
  },
  {
    question: 'Can I use Bitcoin for remittances to and from Africa?',
    answerHtml: `<p>Yes, Bitcoin can be an efficient and cost-effective way to send remittances. By using Bitcoin, you can often avoid high fees associated with traditional remittance services. However, both the sender and receiver will need access to Bitcoin wallets, and the receiver will need to convert Bitcoin to local currency if required.</p>`,
  },
  {
    question: 'How can I mine Bitcoin in Africa, and is it profitable?',
    answerHtml: `<p>Bitcoin mining requires significant computing power and electricity, which can make it costly in many African countries. Some regions with lower electricity costs and suitable climates may find mining profitable, but for most, it is often more practical to buy Bitcoin rather than mine it. Additionally, mining setups can be complex and require technical expertise.</p>`,
  },
  {
    question: 'What are the tax implications of using or trading Bitcoin in Africa?',
    answerHtml: `<p>Tax treatment of Bitcoin varies by country. In South Africa, for instance, Bitcoin is subject to capital gains tax, and trading profits must be declared. In other countries, there are no clear tax guidelines for Bitcoin. Consult local tax regulations or speak with a tax professional for clarity on your obligations.</p>`,
  },
  {
    question: 'What are the transaction fees for sending and receiving Bitcoin?',
    answerHtml: `<p>Transaction fees on the Bitcoin network vary based on demand, but they are typically lower than international bank transfers. Fees can range from a few cents to several dollars, depending on the network's congestion and transaction priority. Some wallets allow you to adjust fees to speed up or slow down transaction times.</p>`,
  },
  {
    question: 'How do I convert Bitcoin to my local currency?',
    answerHtml: `<p>You can convert Bitcoin to your local currency on exchanges like Binance, Luno, or peer-to-peer platforms. You'll need to transfer Bitcoin from your wallet to the exchange, sell it for your currency, and then withdraw it to your bank account or mobile money account, if supported.</p>`,
  },
  {
    question: 'What are the common Bitcoin scams to watch out for in Africa?',
    answerHtml: `<p>Common scams include Ponzi schemes that promise high returns, fake investment platforms, and phishing scams targeting wallet login information. Be cautious of "guaranteed returns" and always verify the legitimacy of a platform before investing. Only use trusted exchanges and wallets to safeguard your Bitcoin.</p>`,
  },
] as const

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: stripHtml(item.answerHtml),
    },
  })),
}
