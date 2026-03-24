import Accordion from "@/components/ui/Accordion";
import { DayItinerary } from "@/types";

interface ItineraryAccordionProps {
  itinerary: DayItinerary[];
}

export default function ItineraryAccordion({ itinerary }: ItineraryAccordionProps) {
  return (
    <div className="space-y-3">
      {itinerary.map((day, idx) => (
        <Accordion
          key={day.day}
          title={`Day ${day.day}: ${day.theme}`}
          defaultOpen={idx === 0}
        >
          <div className="space-y-4">
            {/* Activities */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-primary mb-2">
                Activities
              </p>
              <ul className="space-y-1.5">
                {day.activities.map((activity) => (
                  <li key={activity} className="flex items-start gap-2">
                    <svg
                      className="w-4 h-4 text-secondary shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                    <span>{activity}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Learning Outcome */}
            <div className="rounded-lg bg-primary/5 border border-primary/10 px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-primary mb-1">
                Learning Outcome
              </p>
              <p className="text-text-secondary text-sm">{day.learningOutcome}</p>
            </div>
          </div>
        </Accordion>
      ))}
    </div>
  );
}
