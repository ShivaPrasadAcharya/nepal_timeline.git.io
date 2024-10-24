import React, { useState } from 'react';
import { Globe2, Info } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const timelineData = [
  {
    year: "Rana Period | राणा काल",
    title: {
      en: "Introduction of Public Complaint Boxes",
      ne: "सार्वजनिक उजुरी पेटिकाको सुरुवात"
    },
    description: {
      en: "Dev Shamsher introduced complaint boxes in public places to hear public grievances directly.",
      ne: "देव शम्शेरले सार्वजनिक स्थलहरूमा उजुरी पेटिका राखी जनगुनासा आफैले सुनुवाइ गर्न थालेका थिए।"
    },
    category: "complaint"
  },
  {
    year: "1957 | २०१४",
    title: {
      en: "Work Efficiency Committee",
      ne: "कार्य शीघ्र कारक समिति"
    },
    description: {
      en: "King Mahendra established 'Quick Action Committee Act 2014' under Major General Yog Bikram Rana.",
      ne: "राजा महेन्द्रले 'कार्य शीघ्र कारक समिति ऐन, २०१४' जारी गरी मेजर जनरल योग विक्रम राणाको अध्यक्षतामा एक समिति गठन।"
    },
    category: "administration"
  },
  {
    year: "1961 | २०१८",
    title: {
      en: "Monitoring Teams",
      ne: "दौडाहा टोली"
    },
    description: {
      en: "King Mahendra deployed inspection teams and established 'Investigation Center' under Crown Prince.",
      ne: "राजा महेन्द्रले दौडाहा टोली खटाई सेवा वितरणको निगरानी र दरबारमा 'जाँचबुझ केन्द्र' खडा।"
    },
    category: "monitoring"
  },
  {
    year: "1975 | २०३२",
    title: {
      en: "District Administration Plan",
      ne: "जिल्ला प्रशासन योजना"
    },
    description: {
      en: "Implementation of 'District Administration Plan 2031' introducing Single Clearing House concept.",
      ne: "'जिल्ला प्रशासन योजना, २०३१' लागू गरेर Single Clearing House को अवधारणाको थालनी।"
    },
    category: "administration"
  },
  {
    year: "1999 | २०५६",
    title: {
      en: "Citizen Charter Initiative",
      ne: "नागरिक बडापत्रको सुरुवात"
    },
    description: {
      en: "Introduction of 'Income for Poor, Justice for Helpless' directive and first Citizen Charter.",
      ne: "'गरिबलाई आय निमुखालाई न्याय' नाम दिएर सार्वजनिक सेवा सुधारको निर्देशिका र पहिलो नागरिक बडापत्र।"
    },
    category: "governance"
  },
  {
    year: "2002 | २०५९",
    title: {
      en: "Mobile Service Implementation",
      ne: "घुम्ती सेवाको सुरुवात"
    },
    description: {
      en: "Introduction of 'Mobile Service' during Maoist conflict to deliver services in remote areas.",
      ne: "माओवादी द्वन्द्वको समयमा 'घुम्ती सेवा' सञ्चालन गरी सेवा वितरणको पहुँच विस्तार।"
    },
    category: "service"
  },
  {
    year: "2007 | २०६४",
    title: {
      en: "Good Governance Act",
      ne: "सुशासन ऐन"
    },
    description: {
      en: "Implementation of Good Governance Act 2064 institutionalizing Citizen Charter and public hearings.",
      ne: "सुशासन ऐन, २०६४ जारी गरी नागरिक बडापत्र, सार्वजनिक सुनुवाइ र क्षतिपूर्तिको प्रावधान।"
    },
    category: "governance"
  },
  {
    year: "Present | वर्तमान",
    title: {
      en: "Digital Governance",
      ne: "डिजिटल शासन"
    },
    description: {
      en: "Implementation of e-governance through Nagarik Apps, Mero Kitta, and PSC Mobile App.",
      ne: "नागरिक एप्स, मेरो कित्ता, लोक सेवा आयोगको मोबाइल एप्स र अनलाइन सेवाहरूको कार्यान्वयन।"
    },
    category: "digital"
  }
];

// Custom Flip Icon component
const FlipIcon = ({ className = "w-4 h-4" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
  >
    <path d="M8 3H5a2 2 0 0 0-2 2v3" />
    <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
    <path d="M3 16v3a2 2 0 0 0 2 2h3" />
    <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
  </svg>
);

const CategoryIcon = ({ category }) => {
  const iconClass = "w-6 h-6";
  const getColor = () => {
    switch (category) {
      case 'complaint': return 'text-red-500';
      case 'administration': return 'text-blue-500';
      case 'monitoring': return 'text-purple-500';
      case 'governance': return 'text-green-500';
      case 'service': return 'text-orange-500';
      case 'digital': return 'text-cyan-500';
      default: return 'text-gray-500';
    }
  };
  
  return (
    <div className={`${getColor()} p-2 rounded-full bg-opacity-10 bg-current`}>
      <Info className={iconClass} />
    </div>
  );
};

const HoverCard = ({ description, title, isLeft }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  
  return (
    <div className={`absolute top-0 ${isLeft ? 'right-full mr-2' : 'left-full ml-2'} w-72 pointer-events-auto`}>
      <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
        <div className="flex justify-between items-center mb-2">
          <h4 className="font-semibold text-sm text-gray-600">
            {isFlipped ? 'नेपाली' : 'English'}
          </h4>
          <button 
            onClick={() => setIsFlipped(!isFlipped)}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Switch language"
          >
            <FlipIcon className="w-4 h-4 text-gray-600" />
          </button>
        </div>
        <div className="relative min-h-[60px]">
          <div className={`transition-all duration-300 ${isFlipped ? 'opacity-0' : 'opacity-100'}`}>
            <p className="text-sm text-gray-700">{description.en}</p>
          </div>
          <div className={`absolute top-0 left-0 w-full transition-all duration-300 ${isFlipped ? 'opacity-100' : 'opacity-0'}`}>
            <p className="text-sm text-gray-700">{description.ne}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const TimelineEntry = ({ data, isActive, onClick, index, totalEntries }) => {
  const [isHovered, setIsHovered] = useState(false);
  const showOnLeft = index > totalEntries / 2;

  return (
    <div 
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className={`cursor-pointer transition-all duration-300 ${
          isActive 
            ? 'bg-blue-100 border-blue-500 shadow-md transform scale-102' 
            : 'bg-gray-50 hover:bg-gray-100 border-gray-200'
        } border rounded-lg p-4 mb-3 flex items-center gap-3`}
        onClick={onClick}
      >
        <CategoryIcon category={data.category} />
        <div className="flex-1">
          <div className="font-bold text-lg">{data.year}</div>
          <div className={`text-sm ${isActive ? 'text-blue-800' : 'text-gray-600'}`}>
            {data.title.en}
          </div>
        </div>
      </div>
      
      {isHovered && (
        <HoverCard 
          description={data.description}
          title={data.title}
          isLeft={showOnLeft}
        />
      )}
    </div>
  );
};

function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [language, setLanguage] = useState('en');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ne' : 'en');
  };

  return (
    <Card className="w-full max-w-3xl mx-auto bg-gradient-to-br from-blue-50 to-purple-50">
      <CardContent className="p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            {language === 'en' ? 
              'Public Service Reforms in Nepal' : 
              'नेपालमा सार्वजनिक सेवा सुधार'
            }
          </h2>
          <button 
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm hover:shadow-md transition-all duration-300"
          >
            <Globe2 className="w-5 h-5" />
            {language === 'en' ? 'नेपाली' : 'English'}
          </button>
        </div>
        
        <div className="relative max-w-xl mx-auto">
          <div className="space-y-2">
            {timelineData.map((entry, index) => (
              <TimelineEntry
                key={entry.year}
                data={entry}
                isActive={index === activeIndex}
                onClick={() => setActiveIndex(index)}
                index={index}
                totalEntries={timelineData.length}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default App;
