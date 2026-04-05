import skyline from '@/assets/amsterdam-skyline.png';

const AmsterdamSkyline = () => {
  return (
    <div className="w-full py-8 lg:py-12 overflow-hidden">
      <img
        src={skyline}
        alt="Amsterdam skyline illustration"
        className="w-full h-auto opacity-70"
        loading="lazy"
      />
    </div>
  );
};

export default AmsterdamSkyline;
