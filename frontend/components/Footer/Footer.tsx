import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground mt-24">
        <div className="max-w-480 mx-auto px-6 lg:px-12 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-10 h-10 bg-primary-foreground rounded-lg flex items-center  justify-center">
                          <span className="text-primary font-heading text-xl ">DS</span>
                        </div>
                        <span className="font-heading text-xl">DevSprint</span>
                    </div>
                    <p className="font-paragraph text-sm text-primary-foreground/80">
                      Build, document, and showcase your developer skills through focused sprints.
                    </p>
                </div>
                <div>
                    <h3 className="font-heading text-lg mb-4">Platform</h3>
                    <ul className="space-y-2">
                      <li>
                        <Link href={"/"} className="font-paragraph text-sm text-primary-foreground80 hover:text-primary-foreground">
                          Home
                        </Link>
                      </li>
                      <li>
                        <Link href={"/dashboard"} className="font-paragraph text-smtext-primary-foreground/80 hover:text-primary-foreground">
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link href={"/portfolio"} className="font-paragraph text-smtext-primary-foreground/80 hover:text-primary-foreground">
                          Portfolio
                        </Link>
                      </li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-heading text-lg mb-4">Resources</h3>
                    <ul className="space-y-2">
                      <li>
                        <a href="#" className="font-paragraph text-sm text-primary-foreground/8hover:text-primary-foreground">
                          Documentation
                        </a>
                      </li>
                      <li>
                        <a href="#" className="font-paragraph text-sm text-primary-foreground/8hover:text-primary-foreground">
                          Templates
                        </a>
                      </li>
                      <li>
                        <a href="#" className="font-paragraph text-sm text-primary-foreground/8hover:text-primary-foreground">
                          Community
                        </a>
                      </li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-heading text-lg mb-4">Company</h3>
                    <ul className="space-y-2">
                      <li>
                        <a href="#" className="font-paragraph text-sm text-primary-foreground/8hover:text-primary-foreground">
                          About
                        </a>
                      </li>
                      <li>
                        <a href="#" className="font-paragraph text-sm text-primary-foreground/8hover:text-primary-foreground">
                          Contact
                        </a>
                      </li>
                      <li>
                        <a href="#" className="font-paragraph text-sm text-primary-foreground/8hover:text-primary-foreground">
                          Privacy
                        </a>
                      </li>
                    </ul>
                </div>
            </div>
            <div className="border-t border-primary-foreground/20 mt-12 pt-8">
              <p className="font-paragraph text-sm text-primary-foreground/60 text-center">
                © 2025 DevSprint. All rights reserved.
              </p>
            </div>
        </div>
    </footer>
    )
}

export default Footer