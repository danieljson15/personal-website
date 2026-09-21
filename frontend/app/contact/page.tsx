import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Github, Linkedin, Mail, MapPin } from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="content-page relative min-h-screen w-full">
      <div className="container relative z-10 py-24 md:py-32">
        <div className="mx-auto max-w-5xl space-y-8">
          <div className="space-y-4 text-center">
            <div className="page-title inline-block p-4 mb-4">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                <span>Contact Me</span>
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg ">
                <span>Feel free to reach out!</span>
              </p>
            </div>
          </div>

          <div className=" max-w-2xl mx-auto">
            <Card className="border border-border bg-card portfolio-card">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>
                  Here are the ways you can reach me directly.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 mt-1" />
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <div className="flex flex-col text-sm text-muted-foreground">
                      <a
                        href="mailto:danieljson15@gmail.com"
                        className="hover:text-foreground"
                      >
                        <span className="font-semibold">Personal:</span>{' '}
                        danieljson15@gmail.com
                      </a>
                      <a
                        href="mailto:gtb4ua@virginia.edu"
                        className="hover:text-foreground"
                      >
                        <span className="font-semibold">School:</span>{' '}
                        gtb4ua@virginia.edu
                      </a>
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5" />
                  <div>
                    <h3 className="font-medium">Location</h3>
                    <p className="text-sm text-muted-foreground">
                      School: Charlottesville, VA | Home: Vienna, VA
                    </p>
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
