import { ArrowUpRight } from 'lucide-react';

export function ApplicationEmbed({ formUrl }: { formUrl: string }) {
  const embedUrl = `${formUrl.replace(/\/viewform.*$/, '/viewform')}?embedded=true`;

  return (
    <div className="application-embed" data-reveal>
      <div className="application-embed__note">
        <span>APPLICATION FORM</span>
        <p>
          フォームの入力にはGoogleアカウントへのログインが必要です。表示されない場合は、別画面から同じフォームを開けます。
        </p>
        <a className="button button--primary" href={formUrl} target="_blank" rel="noreferrer">
          フォームを別画面で開く
          <ArrowUpRight aria-hidden="true" />
        </a>
      </div>
      <div className="application-embed__frame-wrap">
        <iframe
          className="application-frame"
          src={embedUrl}
          title="内観セッション 申し込みフォーム"
          loading="lazy"
        >
          Googleフォームを表示できません。
        </iframe>
      </div>
    </div>
  );
}
