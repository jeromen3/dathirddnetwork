export default function PricingPage() {
  return (
    <div className="max-w-2xl mx-auto py-20">
      <h2 className="text-3xl font-bold mb-6">Pricing</h2>
      <ul className="space-y-6 text-lg">
        <li>
          <strong>Starter:</strong> $199 setup + $99/mo
        </li>
        <li>
          <strong>Pro:</strong> $499 setup + $199/mo
        </li>
        <li>
          <strong>Enterprise:</strong> Custom
        </li>
      </ul>
    </div>
  )
}
