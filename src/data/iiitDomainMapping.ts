// Mapping of IIIT IDs to their email domains
export const iiitDomainMapping: Record<string, string> = {
  'iiit-sri-city': '@iiits.in',
  'iiit-agartala': '@iiita.ac.in',
  'iiit-allahabad': '@iiita.ac.in',
  'iiit-bangalore': '@iiitb.ac.in',
  'iiit-bhagalpur': '@iiitbh.ac.in',
  'iiit-bhopal': '@iiitbhopal.ac.in',
  'iiit-bhubaneswar': '@iiit-bh.ac.in',
  'iiit-dharwad': '@iiitdwd.ac.in',
  'iiit-guwahati': '@iiitg.ac.in',
  'iiit-gwalior': '@iiitm.ac.in',
  'iiit-hyderabad': '@iiit.ac.in',
  'iiit-jabalpur': '@iiitdmj.ac.in',
  'iiit-kalyani': '@iiitkalyani.ac.in',
  'iiit-kancheepuram': '@iiitdm.ac.in',
  'iiit-kota': '@iiitk.ac.in',
  'iiit-kottayam': '@iiitkottayam.ac.in',
  'iiit-kurnool': '@iiitk.ac.in',
  'iiit-lucknow': '@iiitl.ac.in',
  'iiit-manipur': '@iiitmanipur.ac.in',
  'iiit-nagpur': '@iiitn.ac.in',
  'iiit-pune': '@iitp.ac.in',
  'iiit-ranchi': '@iiitranchi.ac.in',
  'iiit-raichur': '@iiitr.ac.in',
  'iiit-sonepat': '@iiitsonepat.ac.in',
  'iiit-surat': '@iiitsurat.ac.in',
  'iiit-tiruchirappalli': '@iiitt.ac.in',
  'iiit-una': '@iiitu.ac.in',
  'iiit-vadodara': '@iiitvadodara.ac.in',
};

// Helper function to get IIIT ID from email domain
export const getIIITFromEmail = (email: string): string | null => {
  const domain = email.substring(email.indexOf('@'));
  for (const [iiitId, iiitDomain] of Object.entries(iiitDomainMapping)) {
    if (domain === iiitDomain) {
      return iiitId;
    }
  }
  return null;
};
