// ============================================
// TrustedBy.tsx
// ============================================

export const TrustedBy = () => {
  const brands = ['TechCorp', 'InnovateLab', 'DataFlow', 'CloudSync', 'NextGen', 'SmartOps', 'DigiPro', 'AutomateX'];

  return (
    <section className="trusted-by">
      <div className="trusted-container">
        <div className="brands-wrapper">
          {brands.map((brand, i) => (
            <div key={i} className="brand-item">
              {brand}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
