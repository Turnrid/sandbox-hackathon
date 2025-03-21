export interface Deployment {
  id: string;
  name: string;
  letter: string;
  color: string;
  status: string;
  address?: {
    street: string;
    suite: string;
    city: string;
    zipCode: string;
  };
  contacts?: {
    name: string;
    email: string;
  }[];
  services: Service[];
  compliance?: {
    gdpr: 'compliant' | 'warning' | 'non-compliant';
    ccpa: 'compliant' | 'warning' | 'non-compliant';
  };
}

export interface Service {
  name: string;
  status: string;
  type: string;
  versions: Version[];
  devices?: Device[];
}

export interface Version {
  number: string;
  color: 'green' | 'yellow' | 'red';
}

export interface Device {
  name: string;
  id: string;
  version: string;
  versionColor: string;
  rootHash: string;
  lastAccessed: string;
  lastHeartbeat: string;
}

export interface DeploymentCardProps {
  deployment: {
    services: {
      name: string;
      status?: string;
      type: string;
      versions: { number: string; color: string }[];
    }[];
  };
}
