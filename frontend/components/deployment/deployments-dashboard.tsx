'use client';

import { useState } from 'react';
import DeploymentCard from './deployment-card';
import { Deployment } from '@/models/IDeployment';

export default function DeploymentsDashboard() {
  const [deployments] = useState<Deployment[]>([
    {
      id: '1',
      name: 'Doe Systems',
      letter: 'D',
      color: 'bg-[#8B5D5D]',
      status: '6/6',
      address: {
        street: '456 Main Street',
        suite: 'Suite 101',
        city: 'Boston',
        zipCode: '02108',
      },
      contacts: [
        { name: 'John Smith', email: 'john.smith@doeinc.com' },
        { name: 'Sarah Johnson', email: 'sarah.j@doeinc.com' },
      ],
      services: [
        {
          name: 'IoT sensor',
          status: '5/5',
          type: 'IoT firmware',
          versions: [
            { number: 'v 1.0.1', color: 'green' },
            { number: 'v 1.1.1', color: 'green' },
          ],
          devices: [
            {
              name: 'Sensor 1 - a1b2c3d4',
              id: 'a1b2c3d4',
              version: 'v 1.0.1',
              versionColor: '#00b69b',
              rootHash: '600bd0c82e706574a870de4c0f...',
              lastAccessed: '1/15/24 2:30 pm',
              lastHeartbeat: '12/5/25 3:45 am',
            },
            {
              name: 'Sensor 2 - e5f6g7h8',
              id: 'e5f6g7h8',
              version: 'v 1.1.1',
              versionColor: '#00b69b',
              rootHash: '600bd0c82e706574a870de4c0f...',
              lastAccessed: '1/16/24 4:15 pm',
              lastHeartbeat: '12/5/25 5:20 am',
            },
          ],
        },
        {
          name: 'Servers',
          status: '1/1',
          type: 'releases',
          versions: [{ number: 'v 2.3.31', color: 'red' }],
          devices: [
            {
              name: 'Main Server - s1d2f3g4',
              id: 's1d2f3g4',
              version: 'v 2.3.31',
              versionColor: '#ff4f4f',
              rootHash: '1dc6c8dc6352da5ec1fc83bb40f...',
              lastAccessed: '1/12/24 1:45 pm',
              lastHeartbeat: '12/3/25 2:35 am',
            },
          ],
        },
      ],
      compliance: {
        gdpr: 'compliant',
        ccpa: 'compliant',
      },
    },
    {
      id: '2',
      name: 'US Forest services',
      letter: 'U',
      color: 'bg-[#5D8B5E]',
      status: '26/26',
      address: {
        street: '789 Forest Avenue',
        suite: 'Building A',
        city: 'Portland',
        zipCode: '04101',
      },
      contacts: [
        { name: 'Robert Pine', email: 'robert.pine@usforest.gov' },
        { name: 'Lisa Woods', email: 'l.woods@usforest.gov' },
      ],
      services: [
        {
          name: 'Gateways',
          status: '9/9',
          type: 'releases',
          versions: [
            { number: 'v 1.0.1', color: 'green' },
            { number: 'v 1.1.1', color: 'green' },
          ],
          devices: [
            {
              name: 'North Gate - n1g2h3j4',
              id: 'n1g2h3j4',
              version: 'v 1.0.1',
              versionColor: '#00b69b',
              rootHash: 'bf241dbd74c70f7afeb1e5252f67...',
              lastAccessed: '2/10/24 9:45 am',
              lastHeartbeat: '12/4/25 7:35 am',
            },
            {
              name: 'South Gate - s5g6h7j8',
              id: 's5g6h7j8',
              version: 'v 1.1.1',
              versionColor: '#00b69b',
              rootHash: 'bf241dbd74c70f7afeb1e5252f67...',
              lastAccessed: '2/11/24 10:30 am',
              lastHeartbeat: '12/4/25 8:15 am',
            },
          ],
        },
        {
          name: 'Servers',
          status: '2/2',
          type: 'releases',
          versions: [{ number: 'v 2.3.31', color: 'red' }],
          devices: [
            {
              name: 'Main Server - ms1d2f3',
              id: 'ms1d2f3',
              version: 'v 2.3.31',
              versionColor: '#ff4f4f',
              rootHash: '1dc6c8dc6352da5ec1fc83bb40f...',
              lastAccessed: '2/5/24 3:15 pm',
              lastHeartbeat: '12/3/25 4:25 am',
            },
          ],
        },
        {
          name: 'Weather St.',
          status: '15/15',
          type: 'releases',
          versions: [
            { number: 'v 1.7.0', color: 'green' },
            { number: 'v 1.7.1', color: 'red' },
            { number: 'v 1.6.9', color: 'red' },
          ],
          devices: [
            {
              name: 'Station 1 - ws1t2y3',
              id: 'ws1t2y3',
              version: 'v 1.7.0',
              versionColor: '#00b69b',
              rootHash: '600bd0c82e706574a870de4c0f...',
              lastAccessed: '2/15/24 11:45 am',
              lastHeartbeat: '12/5/25 9:35 am',
            },
            {
              name: 'Station 2 - ws4t5y6',
              id: 'ws4t5y6',
              version: 'v 1.7.1',
              versionColor: '#ff4f4f',
              rootHash: '600bd0c82e706574a870de4c0f...',
              lastAccessed: '2/16/24 1:30 pm',
              lastHeartbeat: '12/5/25 10:20 am',
            },
          ],
        },
      ],
      compliance: {
        gdpr: 'compliant',
        ccpa: 'warning',
      },
    },
    {
      id: '3',
      name: 'Chicago Office',
      letter: 'C',
      color: 'bg-[#3749a6]',
      status: '26/30',
      address: {
        street: '123 East Street',
        suite: 'Suite 201',
        city: 'Chicago',
        zipCode: '97983',
      },
      contacts: [
        { name: 'John Doe', email: 'john.doe@example.com' },
        { name: 'Jane Doe', email: 'jane.doe@example.com' },
      ],
      services: [
        {
          name: 'Gateways',
          status: '5/5',
          type: 'software name',
          versions: [
            { number: 'v 1.0.1', color: 'green' },
            { number: 'v 1.1.1', color: 'yellow' },
          ],
          devices: [
            {
              name: 'front door 1 - 60f608ff',
              id: '60f608ff',
              version: 'v 1.1.1',
              versionColor: '#aab600',
              rootHash: '600bd0c82e706574a870de4c0f...',
              lastAccessed: '1/10/24 3:45 pm',
              lastHeartbeat: '12/2/25 1:35 am',
            },
            {
              name: 'parking lot - 7geh26sf',
              id: '7geh26sf',
              version: 'v 1.1.1',
              versionColor: '#aab600',
              rootHash: '600bd0c82e706574a870de4c0f...',
              lastAccessed: '4/8/24 3:45 pm',
              lastHeartbeat: '12/2/25 2:55 am',
            },
            {
              name: 'basement - 00det2s5',
              id: '00det2s5',
              version: 'v 1.1.1',
              versionColor: '#aab600',
              rootHash: '600bd0c82e706574a870de4c0f...',
              lastAccessed: '3/10/24 2:45 pm',
              lastHeartbeat: '12/2/25 11:00 am',
            },
            {
              name: 'warehouse 1 - 6efw44qa',
              id: '6efw44qa',
              version: 'v 1.0.1',
              versionColor: '#00b69b',
              rootHash: 'bf241dbd74c70f7afeb1e5252f67...',
              lastAccessed: '1/10/24 5:45 pm',
              lastHeartbeat: '12/2/25 5:35 pm',
            },
            {
              name: 'warehouse 2 - ojd6w4fo',
              id: 'ojd6w4fo',
              version: 'v 1.0.1',
              versionColor: '#00b69b',
              rootHash: 'bf241dbd74c70f7afeb1e5252f67...',
              lastAccessed: '12/1/25 1:45 pm',
              lastHeartbeat: '12/2/25 4:35 am',
            },
          ],
        },
        {
          name: 'Servers',
          status: '1/1',
          type: 'ceros',
          versions: [{ number: 'v 2.3.31', color: 'red' }],
          devices: [
            {
              name: 'Main Ceros - 60f608ff',
              id: '60f608ff',
              version: 'v 2.3.31',
              versionColor: '#ff4f4f',
              rootHash: '1dc6c8dc6352da5ec1fc83bb40f...',
              lastAccessed: '1/10/24 3:45 pm',
              lastHeartbeat: '12/2/25 1:35 am',
            },
          ],
        },
        {
          name: 'Cameras',
          status: '15/19',
          type: 'open vms',
          versions: [
            { number: 'v 1.7.0', color: 'green' },
            { number: 'v 1.7.1', color: 'red' },
            { number: 'v 1.6.9', color: 'red' },
          ],
          devices: [
            {
              name: 'Camera 1 - c1a2m3',
              id: 'c1a2m3',
              version: 'v 1.7.0',
              versionColor: '#00b69b',
              rootHash: '600bd0c82e706574a870de4c0f...',
              lastAccessed: '1/5/24 9:45 am',
              lastHeartbeat: '12/1/25 8:35 am',
            },
            {
              name: 'Camera 2 - c4a5m6',
              id: 'c4a5m6',
              version: 'v 1.7.1',
              versionColor: '#ff4f4f',
              rootHash: '600bd0c82e706574a870de4c0f...',
              lastAccessed: '1/6/24 10:30 am',
              lastHeartbeat: '12/1/25 9:20 am',
            },
          ],
        },
      ],
      compliance: {
        gdpr: 'non-compliant',
        ccpa: 'warning',
      },
    },
    {
      id: '4',
      name: 'Krambles Foods',
      letter: 'K',
      color: 'bg-[#9370DB]',
      status: '6/6',
      address: {
        street: '789 Food Avenue',
        suite: 'Floor 3',
        city: 'Minneapolis',
        zipCode: '55401',
      },
      contacts: [
        { name: 'Kevin Kramble', email: 'kevin@kramblefoods.com' },
        { name: 'Maria Garcia', email: 'maria@kramblefoods.com' },
      ],
      services: [
        {
          name: 'IoT sensor',
          status: '5/5',
          type: 'IoT firmware',
          versions: [
            { number: 'v 1.0.1', color: 'green' },
            { number: 'v 1.1.1', color: 'green' },
          ],
          devices: [
            {
              name: 'Temp Sensor 1 - ts1k2l3',
              id: 'ts1k2l3',
              version: 'v 1.0.1',
              versionColor: '#00b69b',
              rootHash: '600bd0c82e706574a870de4c0f...',
              lastAccessed: '3/15/24 2:30 pm',
              lastHeartbeat: '12/6/25 3:45 am',
            },
            {
              name: 'Temp Sensor 2 - ts4k5l6',
              id: 'ts4k5l6',
              version: 'v 1.1.1',
              versionColor: '#00b69b',
              rootHash: '600bd0c82e706574a870de4c0f...',
              lastAccessed: '3/16/24 4:15 pm',
              lastHeartbeat: '12/6/25 5:20 am',
            },
          ],
        },
        {
          name: 'Servers',
          status: '1/1',
          type: 'releases',
          versions: [{ number: 'v 2.3.31', color: 'red' }],
          devices: [
            {
              name: 'Main Server - ms1k2l3',
              id: 'ms1k2l3',
              version: 'v 2.3.31',
              versionColor: '#ff4f4f',
              rootHash: '1dc6c8dc6352da5ec1fc83bb40f...',
              lastAccessed: '3/10/24 1:45 pm',
              lastHeartbeat: '12/4/25 2:35 am',
            },
          ],
        },
      ],
      compliance: {
        gdpr: 'compliant',
        ccpa: 'compliant',
      },
    },
    {
      id: '5',
      name: 'Doors',
      letter: 'D',
      color: 'bg-[#8B5D5D]',
      status: '3/3',
      address: {
        street: '456 Security Blvd',
        suite: 'Unit 5',
        city: 'Denver',
        zipCode: '80202',
      },
      contacts: [{ name: 'David Lock', email: 'david@doorsecurity.com' }],
      services: [
        {
          name: 'IoT sensor',
          status: '5/5',
          type: 'IoT firmware',
          versions: [{ number: 'v 1.0.0', color: 'green' }],
          devices: [
            {
              name: 'Door Sensor 1 - ds1p2q3',
              id: 'ds1p2q3',
              version: 'v 1.0.0',
              versionColor: '#00b69b',
              rootHash: '600bd0c82e706574a870de4c0f...',
              lastAccessed: '4/5/24 11:30 am',
              lastHeartbeat: '12/7/25 10:45 am',
            },
          ],
        },
      ],
      compliance: {
        gdpr: 'compliant',
        ccpa: 'compliant',
      },
    },
  ]);

  localStorage.setItem('deployments', JSON.stringify(deployments));

  return (
    <div className="flex h-screen bg-[#F5F6FA]">
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-6 overflow-auto">
          {/* Using standard responsive grid classes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {deployments.map((deployment) => (
              <div key={deployment.id} className="min-w-0">
                <DeploymentCard deployment={deployment} />
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
