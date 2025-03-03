const InfoIcon = () => (
  <svg
    className="w-6 h-6 text-blue-500"
    fill="none"
    stroke="currentColor"
    strokeWidth="2" // Corrected
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round" // Corrected
      strokeLinejoin="round" // Corrected
      d="M13 16h-1v-4h1m0-4h-1m-1 10h4a2 2 0 002-2V8a2 2 0 00-2-2h-4a2 2 0 00-2 2v8a2 2 0 002 2z"
    />
  </svg>
);

export default InfoIcon;
