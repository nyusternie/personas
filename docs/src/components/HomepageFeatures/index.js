import clsx from 'clsx'
import Heading from '@theme/Heading'
import styles from './styles.module.css'

const FeatureList = [
    {
        title: '🤖 AI Assistant',
        Svg: require('@site/static/img/ai-assistant.svg').default,
        description: (
            <>
                Execute transactions and interact with dApps using simple, natural language commands like "Swap 0.1 BCH for MUSD on Cauldron".
            </>
        ),
    },
    {
        title: '🔐 Passkey Authentication',
        Svg: require('@site/static/img/passkey-auth.svg').default,
        description: (
            <>
                No more seed phrases! Secure your wallet with phishing-resistant passkeys (Face ID, Touch ID, PIN) for a user-friendly and safe experience.
            </>
        ),
    },
    {
        title: '⛽ Gasless Transactions',
        Svg: require('@site/static/img/gasless-tx.svg').default,
        description: (
            <>
                Powered by Account Abstraction, our Paymaster setup handles miner fees, allowing users to transact with CashTokens freely without needing native BCH upfront.
            </>
        ),
    },
    {
        title: '🔌 Universal Compatibility',
        Svg: require('@site/static/img/wallet-connect.svg').default,
        description: (
            <>
                Instantly connect to any dApp across the Bitcoin Cash ecosystem with built-in WalletConnect support.
            </>
        ),
    },
    {
        title: '📱 Multi-Platform Access',
        Svg: require('@site/static/img/multi-platform.svg').default,
        description: (
            <>
                Use your wallet seamlessly as a web app or directly inside the Telegram Mini App.
            </>
        ),
    },
    {
        title: '🛡️ Social Recovery',
        Svg: require('@site/static/img/social-recovery.svg').default,
        description: (
            <>
                Replace complex seed phrases with social recovery mechanisms for enhanced security and user experience.
            </>
        ),
    },
]

function Feature({Svg, title, description}) {
    return (
        <div className={clsx('col col--4')}>
            <div className="text--center">
                <Svg className={styles.featureSvg} role="img" />
            </div>
            <div className="text--center padding-horiz--md">
                <Heading as="h3">{title}</Heading>
                <p>{description}</p>
            </div>
        </div>
    )
}

export default function HomepageFeatures() {
    return (
        <section className={styles.features}>
            <div className="container">
                <div className="row">
                    {FeatureList.map((props, idx) => (
                        <Feature key={idx} {...props} />
                    ))}
                </div>
            </div>
        </section>
    )
}
