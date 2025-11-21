import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function PricingCards() {
  const packages = [
    {
      name: 'Trial Package',
      lessons: '5 Lessons',
      price: '€XX per lesson',
      total: 'Total: €XXX',
      features: [
        'Personalized lesson plans',
        'All learning materials',
        'Homework and practice exercises',
        'Flexible scheduling',
      ],
      bestFor: 'Trying out lessons or short-term goals',
      popular: false,
    },
    {
      name: 'Standard Package',
      lessons: '10 Lessons',
      price: '€XX per lesson (save €X)',
      total: 'Total: €XXX',
      features: [
        'Everything in Trial Package',
        'Progress tracking',
        'Mock tests (for exam students)',
        'Priority scheduling',
      ],
      bestFor: 'Serious improvement and exam preparation',
      popular: true,
    },
    {
      name: 'Intensive Package',
      lessons: '20 Lessons',
      price: '€XX per lesson (save €XX)',
      total: 'Total: €XXX',
      features: [
        'Everything in Standard Package',
        'Comprehensive progress reports',
        'Extra practice materials',
        'Email support between lessons',
      ],
      bestFor: 'Maximum results and complete exam preparation',
      popular: false,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {packages.map((pkg, index) => (
        <Card key={index} className={`p-6 ${pkg.popular ? 'border-soft-blue border-2' : 'border-gray-200'}`}>
          {pkg.popular && (
            <div className="bg-soft-blue text-white text-center py-1 px-3 rounded-full text-sm font-medium mb-4">
              Most Popular
            </div>
          )}
          <h3 className="text-2xl font-poppins font-bold text-gray-900 mb-2">{pkg.name}</h3>
          <div className="text-lg font-inter text-gray-600 mb-1">{pkg.lessons}</div>
          <div className="text-xl font-poppins font-semibold text-soft-blue mb-1">{pkg.price}</div>
          <div className="text-sm font-inter text-gray-500 mb-4">{pkg.total}</div>
          <ul className="space-y-2 mb-6">
            {pkg.features.map((feature, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-soft-blue mr-2">✓</span>
                <span className="text-gray-600 font-inter text-sm">{feature}</span>
              </li>
            ))}
          </ul>
          <div className="text-sm font-inter text-gray-500 mb-4">
            <strong>Best for:</strong> {pkg.bestFor}
          </div>
          <Link href="/book">
            <Button className={`w-full ${pkg.popular ? 'bg-soft-blue hover:bg-soft-blue-dark' : 'bg-gray-800 hover:bg-gray-700'} text-white`}>
              Book {pkg.name}
            </Button>
          </Link>
        </Card>
      ))}
    </div>
  )
}