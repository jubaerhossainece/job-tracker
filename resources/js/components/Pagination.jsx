import { Link } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

function Pagination({ links }) {
  // Don't render pagination if there's only 1 page
  if (links.length <= 3) {
    return null
  }

  return (
    <div className="flex items-center justify-center space-x-2 py-4">
      {links.map((link, i) => {
        // Skip the "prev" link if we're on the first page
        if (link.label === "&laquo; Previous" && link.url === null) {
          return null
        }

        // Skip the "next" link if we're on the last page
        if (link.label === "Next &raquo;" && link.url === null) {
          return null
        }

        // Render previous button
        if (link.label === "&laquo; Previous") {
          return (
            <Button key={i} variant="outline" size="icon" disabled={!link.url} asChild={link.url ? true : false}>
              {link.url ? (
                <Link href={link.url}>
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Previous page</span>
                </Link>
              ) : (
                <>
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Previous page</span>
                </>
              )}
            </Button>
          )
        }

        // Render next button
        if (link.label === "Next &raquo;") {
          return (
            <Button key={i} variant="outline" size="icon" disabled={!link.url} asChild={link.url ? true : false}>
              {link.url ? (
                <Link href={link.url}>
                  <ChevronRight className="h-4 w-4" />
                  <span className="sr-only">Next page</span>
                </Link>
              ) : (
                <>
                  <ChevronRight className="h-4 w-4" />
                  <span className="sr-only">Next page</span>
                </>
              )}
            </Button>
          )
        }

        // Render page number or ellipsis
        if (link.label === "...") {
          return (
            <span key={i} className="px-2">
              ...
            </span>
          )
        }

        // Render page number
        return (
          <Button
            key={i}
            variant={link.active ? "default" : "outline"}
            size="icon"
            asChild={!link.active && link.url ? true : false}
          >
            {!link.active && link.url ? <Link href={link.url}>{link.label}</Link> : link.label}
          </Button>
        )
      })}
    </div>
  )
}

export default Pagination
