export type Task1VisualBankKind = 'line' | 'bar' | 'pie' | 'table' | 'process' | 'map' | 'mixed';

export type Task1VisualBankItem = {
  src: string;
  title: string;
  alt: string;
  width: number;
  height: number;
};

const REVIEW_ROOT = '/images/ielts/task1/visual-bank/review-batch-01';
const PROCESS_ROOT = '/images/ielts/task1/visual-bank/review-batch-02';
const USER_ROOT = '/images/ielts/task1/visual-bank/user-batch-02';

export const TASK1_VISUAL_BANK: Record<Task1VisualBankKind, Task1VisualBankItem[]> = {
  line: [
    { src: `${REVIEW_ROOT}/01-line-internet-access.png`, title: 'Internet access', alt: 'WeLearn line graph showing internet access in three regions from 2000 to 2020.', width: 1568, height: 1003 },
    { src: `${REVIEW_ROOT}/02-line-public-transport.png`, title: 'Public transport', alt: 'WeLearn line graph comparing public transport use over time.', width: 1586, height: 992 },
    { src: `${REVIEW_ROOT}/03-line-renewable-energy.png`, title: 'Renewable energy', alt: 'WeLearn line graph comparing renewable energy trends.', width: 1586, height: 992 },
    { src: `${REVIEW_ROOT}/04-line-temperature.png`, title: 'Temperature', alt: 'WeLearn line graph comparing temperature patterns.', width: 1586, height: 992 },
    { src: `${REVIEW_ROOT}/05-line-tourist-arrivals.png`, title: 'Tourist arrivals', alt: 'WeLearn line graph comparing tourist arrivals over time.', width: 1586, height: 992 },
  ],
  bar: [
    { src: `${REVIEW_ROOT}/06-bar-education-spending.png`, title: 'Education spending', alt: 'WeLearn bar chart comparing government education spending in five countries in 2010 and 2020.', width: 1586, height: 992 },
    { src: `${REVIEW_ROOT}/07-bar-transport-gender.png`, title: 'Transport by gender', alt: 'WeLearn bar chart comparing transport choices by gender.', width: 1586, height: 992 },
    { src: `${REVIEW_ROOT}/08-bar-appliances.png`, title: 'Household appliances', alt: 'WeLearn bar chart comparing household appliance data.', width: 1586, height: 992 },
    { src: `${REVIEW_ROOT}/09-bar-leisure-time.png`, title: 'Leisure time', alt: 'WeLearn bar chart comparing leisure-time data.', width: 1586, height: 992 },
    { src: `${REVIEW_ROOT}/10-bar-museum-visitors.png`, title: 'Museum visitors', alt: 'WeLearn bar chart comparing visitor numbers at museums.', width: 1586, height: 992 },
  ],
  pie: [
    { src: `${REVIEW_ROOT}/11-pie-household-energy.png`, title: 'Household energy', alt: 'WeLearn pie chart showing household energy use by source.', width: 1586, height: 992 },
    { src: `${REVIEW_ROOT}/12-pie-university-budget.png`, title: 'University budget', alt: 'WeLearn pie chart showing the distribution of a university budget.', width: 1586, height: 992 },
    { src: `${REVIEW_ROOT}/13-pie-transport-cities.png`, title: 'Transport in cities', alt: 'WeLearn pie charts comparing transport choices in different cities.', width: 1586, height: 992 },
    { src: `${REVIEW_ROOT}/14-pie-waste-composition.png`, title: 'Waste composition', alt: 'WeLearn pie chart showing the composition of waste.', width: 1586, height: 992 },
    { src: `${REVIEW_ROOT}/15-pie-employment-sectors.png`, title: 'Employment sectors', alt: 'WeLearn pie chart showing employment by sector.', width: 1536, height: 1024 },
  ],
  table: [
    { src: `${REVIEW_ROOT}/16-table-enrolment.png`, title: 'Student enrolment', alt: 'WeLearn data table comparing student enrolment.', width: 1536, height: 1024 },
    { src: `${REVIEW_ROOT}/17-table-coffee-exports.png`, title: 'Coffee exports', alt: 'WeLearn data table comparing coffee exports.', width: 1536, height: 1024 },
    { src: `${REVIEW_ROOT}/18-table-life-expectancy.png`, title: 'Life expectancy', alt: 'WeLearn data table comparing life expectancy.', width: 1586, height: 992 },
    { src: `${REVIEW_ROOT}/19-table-internet-access.png`, title: 'Internet access', alt: 'WeLearn data table comparing internet access.', width: 1536, height: 1024 },
    { src: `${REVIEW_ROOT}/20-table-climate.png`, title: 'Climate data', alt: 'WeLearn data table comparing climate figures.', width: 1536, height: 1024 },
  ],
  process: [
    { src: `${PROCESS_ROOT}/01-process-plastic-recycling.png`, title: 'Plastic recycling', alt: 'WeLearn five-stage process diagram showing how plastic bottles are recycled.', width: 1619, height: 971 },
    { src: `${PROCESS_ROOT}/02-process-coffee-production.png`, title: 'Coffee production', alt: 'WeLearn five-stage process diagram showing how coffee is prepared for sale.', width: 1619, height: 972 },
    { src: `${PROCESS_ROOT}/03-process-bottled-water.png`, title: 'Bottled water', alt: 'WeLearn five-stage process diagram showing how bottled water is produced.', width: 1774, height: 887 },
    { src: `${PROCESS_ROOT}/04-process-brick-manufacturing.png`, title: 'Brick manufacturing', alt: 'WeLearn five-stage process diagram showing how bricks are manufactured.', width: 1619, height: 972 },
    { src: `${PROCESS_ROOT}/05-process-honey-bee-life-cycle.png`, title: 'Honey bee life cycle', alt: 'WeLearn five-stage cyclical diagram showing the honey bee life cycle.', width: 1536, height: 1024 },
  ],
  map: [
    { src: `${USER_ROOT}/06-map-town-centre.png`, title: 'Town centre', alt: 'WeLearn before-and-after maps showing town centre changes from 1990 to 2020.', width: 1586, height: 992 },
    { src: `${USER_ROOT}/07-map-university-campus.png`, title: 'University campus', alt: 'WeLearn before-and-after maps showing university campus development.', width: 1536, height: 1024 },
    { src: `${USER_ROOT}/08-map-coastal-village.png`, title: 'Coastal village', alt: 'WeLearn before-and-after maps showing coastal village changes.', width: 1536, height: 1024 },
    { src: `${USER_ROOT}/10-map-park-redevelopment.png`, title: 'Park redevelopment', alt: 'WeLearn before-and-after maps showing park redevelopment.', width: 1536, height: 1024 },
    { src: `${USER_ROOT}/09-map-shopping-centre.png`, title: 'Shopping centre', alt: 'WeLearn before-and-after maps showing shopping centre redevelopment.', width: 1536, height: 1024 },
  ],
  mixed: [
    { src: `${USER_ROOT}/01-mixed-internet-screen-time.png`, title: 'Internet and screen time', alt: 'WeLearn mixed Task 1 visual combining internet access and screen-time data.', width: 1536, height: 1024 },
    { src: `${USER_ROOT}/02-mixed-transport-preferences.png`, title: 'Transport preferences', alt: 'WeLearn mixed Task 1 visual comparing transport preferences.', width: 1536, height: 1024 },
    { src: `${USER_ROOT}/03-mixed-renewable-adoption.png`, title: 'Renewable adoption', alt: 'WeLearn mixed Task 1 visual comparing renewable-energy adoption.', width: 1536, height: 1024 },
    { src: `${USER_ROOT}/05-mixed-energy-sources.png`, title: 'Energy sources', alt: 'WeLearn mixed Task 1 visual comparing energy sources.', width: 1536, height: 1024 },
  ],
};

export function task1Visual(kind: Task1VisualBankKind, variant = 0): Task1VisualBankItem {
  const visuals = TASK1_VISUAL_BANK[kind];
  return visuals[((variant % visuals.length) + visuals.length) % visuals.length];
}
