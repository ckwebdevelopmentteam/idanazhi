export function BrandLogo({ className = '' }: { className?: string }) {
  return (
    <img
      src="/images/weddings/logo/idanazhi_farm_stay_logo.svg"
      alt="IDANAZHI"
      className={`block object-contain ${className}`}
    />
  );
}
