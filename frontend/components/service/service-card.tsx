import { Card } from '@/components/ui/card';
import { DeploymentCardProps } from '@/models/IDeployment';


export default function ServiceCard({ deployment }: DeploymentCardProps) {
  return (
    <div className="divide-y divide-gray-700 space-y-2 p-2 min-w-[250px]">
      {deployment.services.map((service, index) => (
        <Card key={index} className="overflow-hidden p-0 bg-[#fef7ff]">
          <div className="flex min-w-0">
            {/* Left Side: Name and Status - 1/3 width with truncation */}
            <div className="p-3 w-1/3 min-w-0">
              <div className="font-medium truncate">{service.name}</div>
              {service.status && (
                <div className="text-sm text-gray-400 truncate">
                  {service.status}
                </div>
              )}
            </div>

            {/* Vertical Line - Fixed height and positioning */}
            <div className="border-l border-gray-300 h-auto self-stretch"></div>

            {/* Right Side: Type and Versions - 2/3 width */}
            <div className="p-3 w-2/3 text-right min-w-0">
              <div className="text-sm text-gray-400 truncate">
                {service.type}
              </div>

              {/* Versions */}
              {service.versions.length > 0 && (
                <div className="flex gap-2 mt-2 justify-end overflow-hidden flex-wrap">
                  {service.versions.map((version, vIndex) => (
                    <span
                      key={vIndex}
                      className={`text-xs px-2 py-1 rounded max-w-[100px] truncate ${
                        version.color === 'green'
                          ? 'bg-green-100 text-green-600'
                          : 'bg-red-100 text-red-600'
                      }`}
                    >
                      {version.number}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
