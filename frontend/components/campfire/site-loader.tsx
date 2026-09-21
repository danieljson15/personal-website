/** A short intro beat while the scene assets stream in. Rendered in the server
 * HTML so it appears immediately, then hidden by CSS once the scene reports in
 * (html[data-scene]) — or after a hard cap, so it can never trap the page. */
export function SiteLoader() {
  return (
    <div className="site-loader" aria-hidden="true">
      <img src="/personal-website/capybara-logo.png" alt="" width={52} height={52} />
      <p>
        Daniel Son<span>.</span>
      </p>
      <div className="site-loader-bar">
        <i />
      </div>
      <small>Stoking the fire…</small>
      <noscript>
        <style>{'.site-loader{display:none!important}'}</style>
      </noscript>
    </div>
  )
}
