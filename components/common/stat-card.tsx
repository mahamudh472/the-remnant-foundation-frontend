import { Card, CardContent } from "../ui/card"

function StatCard({ stat }: { stat: { label: string; value: number; icon: any; color: string; bg: string } }) {
  return (
    <Card key={stat.label} className="border-none py-0 shadow-none">
      <CardContent className="flex items-center gap-3 bg-primary/15 p-4">
        <div>
          <p className="text-lg font-bold text-black">{stat.value}</p>
          <p className="text-xs text-gray-500">{stat.label}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default StatCard
