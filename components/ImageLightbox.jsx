import { useEffect, useId, useState } from 'react';

export default function ImageLightbox({
  src,
  alt,
  title,
  triggerClassName = '',
  imageClassName = '',
  loading = 'lazy',
  fallbackSrc = '/assets/img/menu/menu-item-1.png'
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);
  const titleId = useId();

  useEffect(() => {
    setCurrentSrc(src);
  }, [src]);

  const handleImageError = () => {
    if (currentSrc !== fallbackSrc) setCurrentSrc(fallbackSrc);
  };

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
        <img src={currentSrc} className={imageClassName} alt={alt} loading={loading} onError={handleImageError} />
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
            <img src={currentSrc} alt={alt} onError={handleImageError} />
            {title ? <p id={titleId}>{title}</p> : <span id={titleId} className="visually-hidden">{alt}</span>}
          </div>
        </div>
      ) : null}
    </>
  );
}
