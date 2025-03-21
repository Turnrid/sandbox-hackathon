'use client';

import {
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ComplianceSectionProps } from '@/models/ICompliance';


export function CollapsibleComplianceSection({
    title,
    reports,
    className = '',
    deploymentId,
  }: ComplianceSectionProps) {
    const [isOpen, setIsOpen] = useState(false);

    function getStatusClass(status: string): string {
        switch (status) {
          case 'compliant':
            return 'text-green-500'; // Green for compliant
          case 'non-compliant':
            return 'text-[#f93c65]'; // Red for non-compliant
          case 'warning':
            return 'text-[#aab600]'; // Yellow for warning
          default:
            return '';
        }
      }
  
    // Get the most recent report by sorting the reports by date
    const mostRecentReport = [...reports].sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    })[0];
  
    return (
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className={`border border-[#e0e0e0] rounded-lg bg-white shadow-sm ${className}`}
      >
        <div className="flex items-center justify-between p-4 bg-[#f8f8f8]">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-[#313d4f]">{title}</h2>
            {mostRecentReport && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Latest:</span>
                <div className="flex items-center">
                  <span className={getStatusClass(mostRecentReport.status)}>
                    {mostRecentReport.status}
                  </span>
                  {(mostRecentReport.status === 'warning' ||
                    mostRecentReport.status === 'non-compliant') &&
                    mostRecentReport.warningLevel && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Badge
                              variant="destructive"
                              className="ml-1 h-4 w-4 p-0 flex items-center justify-center rounded-full bg-[#f93c65] text-white text-xs"
                            >
                              {mostRecentReport.warningLevel}
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>
                              {mostRecentReport.warningLevel}{' '}
                              {mostRecentReport.warningLevel === 1
                                ? 'issue'
                                : 'issues'}{' '}
                              found
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                </div>
                <span className="text-xs text-gray-400">
                  ({mostRecentReport.date})
                </span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="h-7 px-2 text-xs border-gray-300 text-gray-600 hover:bg-gray-100 hover:text-gray-700"
            >
              View rules
            </Button>
            <Button
              size="sm"
              className="h-7 px-2 text-xs bg-[#202224] text-white hover:bg-[#202224]/90"
            >
              New report
            </Button>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="p-0 h-7 w-7 ml-1">
                {isOpen ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </CollapsibleTrigger>
          </div>
        </div>
        <CollapsibleContent>
          <Card className="bg-white rounded-none border-0 overflow-hidden p-0">
            <Table className="[&_thead]:bg-[#e8e8e8]">
              <TableHeader>
                <TableRow>
                  <TableHead className="text-[#313d4f] font-medium">
                    report date
                  </TableHead>
                  <TableHead className="text-[#313d4f] font-medium">
                    deployment hash
                  </TableHead>
                  <TableHead className="text-[#313d4f] font-medium text-center">
                    entities audited
                  </TableHead>
                  <TableHead className="text-[#313d4f] font-medium">
                    compliance status
                  </TableHead>
                  <TableHead className="text-[#313d4f] font-medium">
                    actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reports.map((report, index) => (
                  <TableRow key={index} className="border-b border-[#e0e0e0]">
                    <TableCell className="text-[#313d4f]">
                      {report.date}
                    </TableCell>
                    <TableCell className="font-mono text-xs text-[#313d4f]">
                      {report.hash}
                    </TableCell>
                    <TableCell className="text-center text-[#313d4f]">
                      {report.entitiesAudited}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <span className={getStatusClass(report.status)}>
                          {report.status}
                        </span>
                        {(report.status === 'warning' ||
                          report.status === 'non-compliant') &&
                          report.warningLevel && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Badge
                                    variant="destructive"
                                    className="ml-1 h-4 w-4 p-0 flex items-center justify-center rounded-full bg-[#f93c65] text-white text-xs"
                                  >
                                    {report.warningLevel}
                                  </Badge>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>
                                    {report.warningLevel}{' '}
                                    {report.warningLevel === 1
                                      ? 'issue'
                                      : 'issues'}{' '}
                                    found
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Link
                        href={`/deployments/${deploymentId}/compliance/report/${report.id}`}
                      >
                        <Button
                          variant="secondary"
                          className="bg-[#5c5c5c] text-white hover:bg-[#5c5c5c]/90 h-6 px-4 py-0 rounded-full text-xs"
                        >
                          view report
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </CollapsibleContent>
      </Collapsible>
    );
  }
  
  function getStatusClass(status: string): string {
    switch (status) {
      case 'compliant':
        return 'text-green-500'; // Green for compliant
      case 'non-compliant':
        return 'text-[#f93c65]'; // Red for non-compliant
      case 'warning':
        return 'text-[#aab600]'; // Yellow for warning
      default:
        return '';
    }
  }