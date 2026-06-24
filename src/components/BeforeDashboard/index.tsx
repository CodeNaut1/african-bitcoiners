import { Banner } from '@payloadcms/ui/elements/Banner'
import React from 'react'

import { SeedButton } from './SeedButton'
import './index.scss'

const baseClass = 'before-dashboard'

const BeforeDashboard: React.FC = () => {
  return (
    <div className={baseClass}>
      <Banner className={`${baseClass}__banner`} type="success">
        <h4>Welcome to African Bitcoiners CMS</h4>
      </Banner>
      Admin tools:
      <ul className={`${baseClass}__instructions`}>
        <li>
          <a href="/admin/import-data">Import Legacy Data</a>
          {' — upload CSV/JSON exports from WordPress (course signups, completions, bounties, vouchers, forms).'}
        </li>
        <li>
          <a href="/admin/database">Database Management</a>
          {' — browse collection stats, search records, export CSV, bulk delete.'}
        </li>
        <li>
          <SeedButton />
          {' to populate default pages, navigation, and homepage content.'}
        </li>
        <li>
          <a href="/" target="_blank">
            Visit the public site
          </a>
          {' to preview changes after publishing.'}
        </li>
      </ul>
    </div>
  )
}

export default BeforeDashboard
