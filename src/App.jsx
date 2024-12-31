import React, { useState } from 'react';
import { Globe2, Info, Languages } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

// Data structure for multiple timelines
const timelineGroups = {
  publicService: {
    id: 'publicService',
    title: {
      en: 'Public Service Reforms in Nepal',
      ne: 'नेपालमा सार्वजनिक सेवा सुधार'
    },
    data: [
      // Original timeline data here...
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
  },
    ]
  },
 education: {
  id: 'education',
  title: {
    en: 'Education Reforms in Nepal',
    ne: 'नेपालमा शिक्षा सुधार'
  },
  data: [
    {
      year: "1951 | २००८",
      title: {
        en: "Nepal National Educational Planning Commission",
        ne: "नेपाल राष्ट्रिय शिक्षा योजना आयोग"
      },
      description: {
        en: "First systematic planning for education in Nepal",
        ne: "नेपालमा शिक्षाको पहिलो व्यवस्थित योजना"
      },
      category: "planning"
    },
    // Add more entries...
  ]
}
  // Add more timeline groups as needed
};

// Existing CategoryIcon component remains the same
const CategoryIcon = ({ category }) => {
  // ... (previous code)
};

// Existing HoverCard component remains the same
const HoverCard = ({ description, title, containerRef, isHovered }) => {
  // ... (previous code)
};

// Existing TimelineEntry component remains the same
const TimelineEntry = ({ data, isActive, onClick, index, language }) => {
  // ... (previous code)
};

// New Timeline component to handle individual timelines
const Timeline = ({ timelineData, title, language, isActive }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!isActive) return null;

  return (
    <Card className="w-full max-w-3xl mx-auto mb-8">
      <CardContent className="p-4">
        <h2 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-6">
          {language === 'en' ? title.en : title.ne}
        </h2>
        
        <div className="relative max-w-3xl mx-auto">
          {timelineData.map((entry, index) => (
            <TimelineEntry
              key={entry.year}
              data={entry}
              isActive={index === activeIndex}
              onClick={() => setActiveIndex(index)}
              index={index}
              language={language}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Modified App component to handle multiple timelines
function App() {
  const [language, setLanguage] = useState('en');
  const [activeTimeline, setActiveTimeline] = useState(Object.keys(timelineGroups)[0]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ne' : 'en');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-6 px-3">
      {/* Language and Timeline Selection Header */}
      <div className="w-full max-w-3xl mx-auto mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <button 
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200"
          >
            <Globe2 className="w-5 h-5 text-blue-600" />
            <span className="font-medium">
              {language === 'en' ? 'नेपाली' : 'English'}
            </span>
          </button>

          {/* Timeline Selection Buttons */}
          <div className="flex gap-2">
            {Object.values(timelineGroups).map((timeline) => (
              <button
                key={timeline.id}
                onClick={() => setActiveTimeline(timeline.id)}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  activeTimeline === timeline.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-blue-600 hover:bg-blue-50'
                } border border-blue-200`}
              >
                {language === 'en' ? timeline.title.en : timeline.title.ne}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline Content */}
      {Object.values(timelineGroups).map((timeline) => (
        <Timeline
          key={timeline.id}
          timelineData={timeline.data}
          title={timeline.title}
          language={language}
          isActive={activeTimeline === timeline.id}
        />
      ))}
    </div>
  );
}

export default App;
