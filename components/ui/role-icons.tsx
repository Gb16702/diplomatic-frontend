import { LucideProps } from "lucide-react";

// Young Professional Icon (Lightning bolt)
export function YoungProfessionalIcon({ size = 24, ...props }: LucideProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

// Sales Team Member Icon (Chart trending up)
export function SalesTeamIcon({ size = 24, ...props }: LucideProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <polyline points="22,7 13.5,15.5 8.5,10.5 2,17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <polyline points="16,7 22,7 22,13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// Startup Founder Icon (Rocket/Target)
export function StartupFounderIcon({ size = 24, ...props }: LucideProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M4.5 16.5C-1.5 10.5 6 0 16 2C18 8 16 12 16 12L20 16L16 20L12 16S8 18 2 16C2 16 4.5 16.5 4.5 16.5Z"
        fill="currentColor"
        stroke="none"
      />
      <path
        d="M11.5 6.5L17.5 12.5"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// HR & Leadership Icon (Users/People)
export function HRLeadershipIcon({ size = 24, ...props }: LucideProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="7" r="4" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path
        d="M23 21V19C23 18.1645 22.7155 17.3541 22.2094 16.6988C21.7033 16.0435 20.9982 15.5814 20.2 15.3687"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 3.36875C16.7978 3.58141 17.5029 4.04353 18.009 4.69881C18.5151 5.35409 18.7996 6.16454 18.7996 7C18.7996 7.83546 18.5151 8.64591 18.009 9.30119C17.5029 9.95647 16.7978 10.4186 16 10.6313"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Diplomat Icon (Circle with initials)
export function DiplomatIcon({ size = 24, ...props }: LucideProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="12" cy="12" r="10" fill="currentColor"/>
      <text
        x="12"
        y="17"
        textAnchor="middle"
        fontSize="10"
        fontWeight="bold"
        fill="white"
        fontFamily="Space Grotesk, sans-serif"
      >
        AA
      </text>
    </svg>
  );
}