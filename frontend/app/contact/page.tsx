"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, Linkedin, Mail, MapPin } from "lucide-react"
import { EnhancedBackground } from "@/components/enhanced-background"
import { TypingEffect } from "@/components/typing-effect"

export default function ContactPage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <EnhancedBackground />
      <div className="container relative z-10 py-24 md:py-32">
        <div className="mx-auto max-w-5xl space-y-8">
          <div className="space-y-4 text-center">
            <div className="text-container inline-block p-4 mb-4">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                <TypingEffect text="Contact Me" speed={100} hideCursorAfter={500} />
              </h1>
              <p
                className="mx-auto max-w-[700px] text-muted-foreground md:text-lg opacity-0 animate-fade-in"
                style={{ animationDelay: "1s", animationFillMode: "forwards" }}
              >
                <TypingEffect
                  text="Feel free to reach out!"
                  speed={50}
                  delay={1000}
                  hideCursorAfter={500}
                />
              </p>
            </div>
          </div>

          <div
            className="opacity-0 animate-fade-in max-w-2xl mx-auto"
            style={{ animationDelay: "1.5s", animationFillMode: "forwards" }}
          >
            <Card className="border border-border bg-card/70 backdrop-blur-md">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>Here are the ways you can reach me directly.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
              <div className="flex items-start gap-3">
  <Mail className="h-5 w-5 mt-1" />
  <div>
    <h3 className="font-medium">Email</h3>
    <div className="flex flex-col text-sm text-muted-foreground">
      <a href="mailto:danieljson15@gmail.com" className="hover:text-foreground">
        <span className="font-semibold">Personal:</span> danieljson15@gmail.com
      </a>
      <a href="mailto:djs6cz@virginia.edu" className="hover:text-foreground">
        <span className="font-semibold">School:</span> djs6cz@virginia.edu
      </a>
    </div>
  </div>
</div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5" />
                  <div>
                    <h3 className="font-medium">Location</h3>
                    <p className="text-sm text-muted-foreground">School: Charlottesville, VA | Home: Vienna, VA</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Linkedin className="h-5 w-5" />
                  <div>
                    <h3 className="font-medium">LinkedIn</h3>
                    <a
                      href="https://www.linkedin.com/in/daniel-son15/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      linkedin.com/in/daniel-son15
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Github className="h-5 w-5" />
                  <div>
                    <h3 className="font-medium">GitHub</h3>
                    <a
                      href="https://github.com/danieljson15"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      github.com/danieljson15
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
//below is the get in touch form (implement later)
/*
"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, MapPin } from "lucide-react"
import { EnhancedBackground } from "@/components/enhanced-background"
import { TypingEffect } from "@/components/typing-effect"

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setSubmitSuccess(true)
    setFormState({ name: "", email: "", message: "" })

    // Reset success message after 5 seconds
    setTimeout(() => setSubmitSuccess(false), 5000)
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <EnhancedBackground />
      <div className="container relative z-10 py-24 md:py-32">
        <div className="mx-auto max-w-5xl space-y-8">
          <div className="space-y-4 text-center">
            <div className="text-container inline-block p-4 mb-4">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                <TypingEffect text="Contact Me" speed={100} hideCursorAfter={500} />
              </h1>
              <p
                className="mx-auto max-w-[700px] text-muted-foreground md:text-lg opacity-0 animate-fade-in"
                style={{ animationDelay: "1s", animationFillMode: "forwards" }}
              >
                <TypingEffect
                  text="Feel free to reach out!"
                  speed={50}
                  delay={1000}
                  hideCursorAfter={500}
                />
              </p>
            </div>
          </div>

          <div
            className="grid gap-8 md:grid-cols-2 opacity-0 animate-fade-in"
            style={{ animationDelay: "1.5s", animationFillMode: "forwards" }}
          >
            <Card className="border border-border bg-card/70 backdrop-blur-md">
              <CardHeader>
                <CardTitle>Get in Touch</CardTitle>
                <CardDescription>Fill out the form and I'll get back to you as soon as possible.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                      className="border-border bg-background/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleChange}
                      placeholder="Your email"
                      required
                      className="border-border bg-background/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      placeholder="Your message"
                      rows={5}
                      required
                      className="border-border bg-background/50"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                    variant="outline"
                    className="border-2"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                  {submitSuccess && (
                    <p className="text-center text-sm text-green-600 dark:text-green-500">
                      Message sent successfully! I'll get back to you soon.
                    </p>
                  )}
                </form>
              </CardContent>
            </Card>

            <Card className="border border-border bg-card/70 backdrop-blur-md">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>Here are the ways you can reach me directly.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5" />
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <a href="mailto:danieljson15@gmail.com" className="text-sm text-muted-foreground hover:text-foreground">
                      Personal: danieljson15@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5" />
                  <div>
                    <h3 className="font-medium">Location</h3>
                    <p className="text-sm text-muted-foreground">Virginia, VA</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Linkedin className="h-5 w-5" />
                  <div>
                    <h3 className="font-medium">LinkedIn</h3>
                    <a
                      href="https://www.linkedin.com/in/daniel-son15/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      linkedin.com/in/daniel-son15
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Github className="h-5 w-5" />
                  <div>
                    <h3 className="font-medium">GitHub</h3>
                    <a
                      href="https://github.com/danieljson15"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      github.com/danieljson15
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}*/

