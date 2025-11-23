import clsx from 'clsx'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import HomepageFeatures from '@site/src/components/HomepageFeatures'

import Heading from '@theme/Heading'
import styles from './index.module.css'

function HomepageHeader() {
    const {siteConfig} = useDocusaurusContext()
    return (
        <header className={clsx('hero hero--primary', styles.heroBanner)}>
            <div className="container">
                <Heading as="h1" className="hero__title">
                    {siteConfig.title}
                </Heading>
                <p className="hero__subtitle">{siteConfig.tagline}</p>
                <div className={styles.buttons}>
                    <Link
                        className="button button--secondary button--lg"
                        to="/docs/intro">
                        Get Started - 5min ⏱️
                    </Link>
                    <Link
                        className="button button--outline button--lg margin-left--md"
                        href="https://dorahacks.io/buidl/32734">
                        View on DoraHacks
                    </Link>
                </div>
            </div>
        </header>
    )
}

export default function Home() {
    const {siteConfig} = useDocusaurusContext()
    return (
        <Layout
            title={`${siteConfig.title} - Personal Finance AI Assistants`}
            description="Personas are revolutionizing how users interact with Bitcoin Cash by solving its biggest challenges: complexity and security. Personal Finance AI Assistants designed to grow and adapt to your busy digital lifestyle.">
            <HomepageHeader />
            <main>
                <HomepageFeatures />
            </main>
        </Layout>
    )
}
