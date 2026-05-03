import { useEffect, useId, useState } from 'react';

export default function ImageLightbox({
  src,
  alt,
  title,
  triggerClassName = '',
  imageClassName = '',
  loading = 'lazy'
}) {
  const [isOpen, setIsOpen] = useState(false);
  const titleId = useId();

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    document.body.classList.add('image-lightbox-open');
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.classList.remove('image-lightbox-open');
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        className={`image-lightbox-trigger ${triggerClassName}`.trim()}
        onClick={() => setIsOpen(true)}
        aria-label={`Open larger image of ${title || alt}`}
      >
        <img src={src} className={imageClassName} alt={alt} loading={loading} />
      </button>

      {isOpen ? (
        <div className="image-lightbox" role="dialog" aria-modal="true" aria-labelledby={titleId}>
          <button
            type="button"
            className="image-lightbox-backdrop"
            aria-label="Close image preview"
            onClick={() => setIsOpen(false)}
          />
          <div className="image-lightbox-content">
            <button
              type="button"
              className="image-lightbox-close"
              aria-label="Close image preview"
              onClick={() => setIsOpen(false)}
            >
              <i className="bi bi-x-lg" aria-hidden="true"></i>
            </button>
            <img src={src} alt={alt} />
            {title ? <p id={titleId}>{title}</p> : <span id={titleId} className="visually-hidden">{alt}</span>}
          </div>
        </div>
      ) : null}
    </>
  );
}
