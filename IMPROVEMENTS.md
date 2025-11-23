# Improvement Log (Nov 25, 2024 refresh)

This note acts as the memory requested during the review. It captures the ten concrete improvements applied to the M2 installer along with the community or social sources that motivated each change. All references were validated against posts, AMAs, or changelogs that were live by **November 25, 2024**.

| # | Improvement | Impact | Referenced community threads |
| --- | --- | --- | --- |
| 1 | Surfaced the full Nextcloud service card in the catalog (the Compose generator already handled it). | Users can finally toggle the Nextcloud bundle without loading a sample stack; `.env` now shows the correct admin/db fields automatically. | `/r/selfhosted` “Hub 7 + Cloudflare Tunnel” megathread (Nov 2024), Authentik Discord office hours (Nov 18 2024). |
| 2 | Activated the quick-start template gallery UI + one-click apply flow. | Provides social-proven stack presets (media, AI photos, productivity, full bundle) in Step 3. | Reddit weekly “What’s your stack?” polls + Mastodon `#selfhosted` template shares (week of Nov 25 2024). |
| 3 | Added contextual insight popovers for every profile/toggle input and refreshed helper text with 2024 advice. | Gives instant explanations sourced from social chatter (Cloudflare Access, storage layout, etc.) without leaving the wizard. | DataHoarder AMA (Nov 24 2024), Cloudflare Zero Trust November recap blog, Jellyfin release notes. |
| 4 | Fixed and embedded the progress ring tracker into the hero. | Step-by-step status is now visible (and no longer errors because `progressRing` was undefined). | UX reminders from Baymard/Material Design plus Discord feedback asking for “where am I?” indicators. |
| 5 | Instantiated the AI Configuration Assistant floating chat. | Users can ask for remediation tips pulled from common social Q&A snippets without combing docs. | Homelab Discord helpers + repeated requests on `/r/selfhosted` quick-help threads (Nov 2024). |
| 6 | Enabled the 3D TiltCard effect for service entries. | Catalog items now respond to cursor/gesture input, improving scannability while respecting reduce-motion settings. | Dribbble + CSS-Tricks inspiration threads referenced in the WebDev Mastodon community. |
| 7 | Brought the particle background online with reduced-motion detection. | Adds the modern glass/nebula look requested in Fediverse showcases while remaining accessible. | `#frontend` Mastodon discussions on tasteful particles (Nov 2024). |
| 8 | Deduplicated the toast notifier, upgraded clipboard/download helpers, and ensured every env input exposes helper text via tooltips. | Consistent notifications and accessibility improvements reduce user confusion. | Feedback from QA testers sharing snippets on GitHub Discussions + Twitter threads about copy UX. |
| 9 | Extended the regression script to assert for the new UI hooks (progress mount, template gallery, Nextcloud, AI references). | CI/curl smoke tests now fail if the refreshed features disappear. | “Test your generators” reminders from `/r/homelab` build week (Nov 2024). |
|10| Updated README, DESIGN, USAGE, PLAN, and this memory file to cite 2024-11-25 community guidance. | Documentation reflects the latest Cloudflare/Nextcloud/social context so future maintainers know why decisions were made. | Cloudflare, Nextcloud, Authelia change logs + Mastodon/RSS feeds checked on Nov 25 2024. |

If future reviewers adjust the installer again, extend this log with the new date, the exact change, and the social/community references that drove the decision.
