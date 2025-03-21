"use client"

import type React from "react"

import { useState } from "react"
import { Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

export interface Service {
  name: string
  version: string
  type: string
}

export interface Deployment {
  id: string
  name: string
  letter: string
  color: string
  status: string
  address?: {
    street: string
    suite: string
    city: string
    zipCode: string
  }
  contacts?: {
    name: string
    email: string
  }[]
  services: Service[]
  compliance?: {
    gdpr: "compliant" | "warning" | "non-compliant"
    ccpa: "compliant" | "warning" | "non-compliant"
  }
}

export function AddDeploymentDrawer({
    open,
    onOpenChange,
}: {
    open: boolean
    onOpenChange: (open: boolean) => void
}) {
  const [deployment, setDeployment] = useState<Partial<Deployment>>({
    color: "#4f46e5",
    services: [],
    status: "active",
  })
  const [includeAddress, setIncludeAddress] = useState(false)
  const [includeContacts, setIncludeContacts] = useState(false)
  const [includeCompliance, setIncludeCompliance] = useState(false)
  const [newService, setNewService] = useState<Partial<Service>>({})
  const [contacts, setContacts] = useState<Array<{ name: string; email: string }>>([])
  const [newContact, setNewContact] = useState({ name: "", email: "" })

  const colorOptions = [
    { value: "#4f46e5", label: "Blue" },
    { value: "#16a34a", label: "Green" },
    { value: "#dc2626", label: "Red" },
    { value: "#ca8a04", label: "Yellow" },
    { value: "#9333ea", label: "Purple" },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Generate a random ID if not provided
    const finalDeployment: Deployment = {
      ...(deployment as Deployment),
      id: deployment.id || Math.random().toString(36).substring(2, 9),
      services: deployment.services || [],
    }

    // Add address if included
    if (includeAddress && deployment.address) {
      finalDeployment.address = deployment.address
    }

    // Add contacts if included
    if (includeContacts && contacts.length > 0) {
      finalDeployment.contacts = contacts
    }

    // Add compliance if included
    if (includeCompliance && deployment.compliance) {
      finalDeployment.compliance = deployment.compliance
    }

    console.log("Submitting deployment:", finalDeployment)
    // Here you would typically save the deployment to your state or backend

    onOpenChange(false)
    resetForm()
  }

  const resetForm = () => {
    setDeployment({
      color: "#4f46e5",
      services: [],
      status: "active",
    })
    setIncludeAddress(false)
    setIncludeContacts(false)
    setIncludeCompliance(false)
    setNewService({})
    setContacts([])
    setNewContact({ name: "", email: "" })
  }

  const addService = () => {
    if (newService.name && newService.type && newService.version) {
      setDeployment({
        ...deployment,
        services: [...(deployment.services || []), newService as Service],
      })
      setNewService({})
    }
  }

  const removeService = (index: number) => {
    const updatedServices = [...(deployment.services || [])]
    updatedServices.splice(index, 1)
    setDeployment({
      ...deployment,
      services: updatedServices,
    })
  }

  const addContact = () => {
    if (newContact.name && newContact.email) {
      setContacts([...contacts, newContact])
      setNewContact({ name: "", email: "" })
    }
  }

  const removeContact = (index: number) => {
    const updatedContacts = [...contacts]
    updatedContacts.splice(index, 1)
    setContacts(updatedContacts)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    // Handle nested properties
    if (name.includes(".")) {
      const [parent, child] = name.split(".")
      setDeployment({
        ...deployment,
        [parent]: {
          ...((deployment[parent as keyof Deployment] as any) || {}),
          [child]: value,
        },
      })
    } else {
      setDeployment({
        ...deployment,
        [name]: value,
      })
    }
  }

  const handleServiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewService({
      ...newService,
      [name]: value,
    })
  }

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewContact({
      ...newContact,
      [name]: value,
    })
  }

  const handleComplianceChange = (type: "gdpr" | "ccpa", value: "compliant" | "warning" | "non-compliant") => {
    setDeployment({
      ...deployment,
      compliance: {
        ...(deployment.compliance || { gdpr: "compliant", ccpa: "compliant" }),
        [type]: value,
      },
    })
  }

  return (
    <>
<Dialog open={open} onOpenChange={onOpenChange}>
  <DialogContent className="max-w-3xl w-full max-h-[90vh] overflow-y-auto">
    <form onSubmit={handleSubmit}>
      <DialogHeader className="border-b">
        <DialogTitle>Add New Deployment</DialogTitle>
        <DialogClose className="absolute right-4 top-4">
          <X className="h-4 w-4" />
        </DialogClose>
      </DialogHeader>
            <div className="p-6 overflow-y-auto" style={{ height: "calc(90vh - 9rem)" }}>
              <Tabs defaultValue="basic">
                <TabsList className="grid grid-cols-4 mb-6">
                  <TabsTrigger value="basic">Basic Info</TabsTrigger>
                  <TabsTrigger value="services">Services</TabsTrigger>
                  <TabsTrigger value="address" disabled={!includeAddress}>
                    Address
                  </TabsTrigger>
                  <TabsTrigger value="contacts" disabled={!includeContacts}>
                    Contacts
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-6 min-h-[400px]">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Deployment Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={deployment.name || ""}
                          onChange={handleInputChange}
                          placeholder="Enter deployment name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="letter">Letter Identifier</Label>
                        <Input
                          id="letter"
                          name="letter"
                          value={deployment.letter || ""}
                          onChange={handleInputChange}
                          placeholder="Single letter (e.g. D)"
                          maxLength={1}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Deployment Color</Label>
                      <div className="flex gap-3">
                        {colorOptions.map((color) => (
                          <div
                            key={color.value}
                            className={cn(
                              "w-8 h-8 rounded-full cursor-pointer border-2",
                              deployment.color === color.value
                                ? "border-black dark:border-white"
                                : "border-transparent",
                            )}
                            style={{ backgroundColor: color.value }}
                            onClick={() => setDeployment({ ...deployment, color: color.value })}
                            title={color.label}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Input
                        id="status"
                        name="status"
                        value={deployment.status || ""}
                        onChange={handleInputChange}
                        placeholder="active, inactive, etc."
                        required
                      />
                    </div>

                    <div className="space-y-4 pt-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="includeAddress">Include Address</Label>
                        <Switch id="includeAddress" checked={includeAddress} onCheckedChange={setIncludeAddress} />
                      </div>

                      <div className="flex items-center justify-between">
                        <Label htmlFor="includeContacts">Include Contacts</Label>
                        <Switch id="includeContacts" checked={includeContacts} onCheckedChange={setIncludeContacts} />
                      </div>

                      <div className="flex items-center justify-between">
                        <Label htmlFor="includeCompliance">Include Compliance</Label>
                        <Switch
                          id="includeCompliance"
                          checked={includeCompliance}
                          onCheckedChange={setIncludeCompliance}
                        />
                      </div>
                    </div>

                    {includeCompliance && (
                      <div className="space-y-4 pt-2">
                        <div className="space-y-2">
                          <Label>GDPR Compliance</Label>
                          <RadioGroup
                            value={deployment.compliance?.gdpr || "compliant"}
                            onValueChange={(value) => handleComplianceChange("gdpr", value as any)}
                            className="flex gap-4"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="compliant" id="gdpr-compliant" />
                              <Label htmlFor="gdpr-compliant" className="text-green-600">
                                Compliant
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="warning" id="gdpr-warning" />
                              <Label htmlFor="gdpr-warning" className="text-amber-600">
                                Warning
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="non-compliant" id="gdpr-non-compliant" />
                              <Label htmlFor="gdpr-non-compliant" className="text-red-600">
                                Non-compliant
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>

                        <div className="space-y-2">
                          <Label>CCPA Compliance</Label>
                          <RadioGroup
                            value={deployment.compliance?.ccpa || "compliant"}
                            onValueChange={(value) => handleComplianceChange("ccpa", value as any)}
                            className="flex gap-4"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="compliant" id="ccpa-compliant" />
                              <Label htmlFor="ccpa-compliant" className="text-green-600">
                                Compliant
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="warning" id="ccpa-warning" />
                              <Label htmlFor="ccpa-warning" className="text-amber-600">
                                Warning
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="non-compliant" id="ccpa-non-compliant" />
                              <Label htmlFor="ccpa-non-compliant" className="text-red-600">
                                Non-compliant
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="services" className="space-y-6 min-h-[400px]">
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="service-name">Service Name</Label>
                        <Input
                          id="service-name"
                          name="name"
                          value={newService.name || ""}
                          onChange={handleServiceChange}
                          placeholder="IoT sensor, Gateways, etc."
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="service-type">Service Type</Label>
                        <Input
                          id="service-type"
                          name="type"
                          value={newService.type || ""}
                          onChange={handleServiceChange}
                          placeholder="IoT firmware, release, etc."
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="service-version">Version</Label>
                        <Input
                          id="service-version"
                          name="version"
                          value={newService.version || ""}
                          onChange={handleServiceChange}
                          placeholder="v1.0.1, v2.3.31, etc."
                        />
                      </div>
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      onClick={addService}
                      disabled={!newService.name || !newService.type || !newService.version}
                      className="w-full"
                    >
                      <Plus className="mr-2 h-4 w-4" /> Add Service
                    </Button>

                    {(deployment.services || []).length > 0 && (
                      <div className="border rounded-md p-4 space-y-3">
                        <h3 className="font-medium">Added Services</h3>
                        {(deployment.services || []).map((service, index) => (
                          <div key={index} className="flex items-center justify-between bg-muted/50 p-3 rounded-md">
                            <div>
                              <p className="font-medium">{service.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {service.type} - {service.version}
                              </p>
                            </div>
                            <Button type="button" variant="ghost" size="sm" onClick={() => removeService(index)}>
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="address" className="space-y-6 min-h-[400px]">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="address.street">Street</Label>
                      <Input
                        id="address.street"
                        name="address.street"
                        value={deployment.address?.street || ""}
                        onChange={handleInputChange}
                        placeholder="Street address"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address.suite">Suite/Apt</Label>
                      <Input
                        id="address.suite"
                        name="address.suite"
                        value={deployment.address?.suite || ""}
                        onChange={handleInputChange}
                        placeholder="Suite or apartment"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="address.city">City</Label>
                        <Input
                          id="address.city"
                          name="address.city"
                          value={deployment.address?.city || ""}
                          onChange={handleInputChange}
                          placeholder="City"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address.zipCode">Zip Code</Label>
                        <Input
                          id="address.zipCode"
                          name="address.zipCode"
                          value={deployment.address?.zipCode || ""}
                          onChange={handleInputChange}
                          placeholder="Zip code"
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="contacts" className="space-y-6 min-h-[400px]">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="contact-name">Contact Name</Label>
                        <Input
                          id="contact-name"
                          name="name"
                          value={newContact.name}
                          onChange={handleContactChange}
                          placeholder="Contact name"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="contact-email">Contact Email</Label>
                        <Input
                          id="contact-email"
                          name="email"
                          type="email"
                          value={newContact.email}
                          onChange={handleContactChange}
                          placeholder="Contact email"
                        />
                      </div>
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      onClick={addContact}
                      disabled={!newContact.name || !newContact.email}
                      className="w-full"
                    >
                      <Plus className="mr-2 h-4 w-4" /> Add Contact
                    </Button>

                    {contacts.length > 0 && (
                      <div className="border rounded-md p-4 space-y-3">
                        <h3 className="font-medium">Added Contacts</h3>
                        {contacts.map((contact, index) => (
                          <div key={index} className="flex items-center justify-between bg-muted/50 p-3 rounded-md">
                            <div>
                              <p className="font-medium">{contact.name}</p>
                              <p className="text-sm text-muted-foreground">{contact.email}</p>
                            </div>
                            <Button type="button" variant="ghost" size="sm" onClick={() => removeContact(index)}>
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            <DialogFooter className="border-t mt-4 pt-4">
        <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white">
          Create Deployment
        </Button>
        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
          Cancel
        </Button>
      </DialogFooter>
    </form>
  </DialogContent>
</Dialog>
    </>
  )
}

