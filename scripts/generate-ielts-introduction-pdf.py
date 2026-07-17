"""Build the complete printable IELTS Task 1 introduction course pack."""

from pathlib import Path
from math import cos, sin, pi

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.graphics.shapes import Drawing, String, Line, Rect, Circle, Wedge, Polygon
from reportlab.platypus import KeepTogether, Paragraph, PageBreak, Spacer, Table, TableStyle

from pdf_templates.welearn_branded import (
    BLUE, INK, LINE, MUTED, NAVY, PALE_BLUE, PALE_GREEN, PALE_RED,
    BRAND_URL, WeLearnDocTemplate, brand_styles,
)

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / 'public' / 'downloads' / 'ielts-writing-task-1-introduccion-paraphrasing-welearn.pdf'
LOGO = ROOT / 'public' / 'images' / 'welearn-logo.png'
CONTENT_W = 174 * mm
CHART_W = 156 * mm
CHART_H = 84 * mm


def text_style(styles, name, size=8.5, leading=12, color=INK):
    return ParagraphStyle(name, parent=styles['body'], fontSize=size, leading=leading, textColor=color, spaceAfter=3)


def chart_title(drawing, title):
    drawing.add(String(8, CHART_H - 13, title, fontName='Helvetica-Bold', fontSize=10, fillColor=NAVY))


def line_chart(title, series):
    d = Drawing(CHART_W, CHART_H)
    chart_title(d, title)
    x0, y0, pw, ph = 34, 22, 106, 43
    for i in range(4):
        y = y0 + i * ph / 3
        d.add(Line(x0, y, x0 + pw, y, strokeColor=LINE, strokeWidth=0.7))
    d.add(Line(x0, y0, x0, y0 + ph, strokeColor=BLUE, strokeWidth=1.1))
    d.add(Line(x0, y0, x0 + pw, y0, strokeColor=BLUE, strokeWidth=1.1))
    palette = [BLUE, colors.HexColor('#059669'), colors.HexColor('#dc2626')]
    for sidx, values in enumerate(series):
        points = []
        for idx, value in enumerate(values):
            x = x0 + idx * pw / (len(values) - 1)
            y = y0 + value * ph
            points.append((x, y))
            d.add(Circle(x, y, 2.2, fillColor=palette[sidx], strokeColor=palette[sidx]))
        for a, b in zip(points, points[1:]):
            d.add(Line(a[0], a[1], b[0], b[1], strokeColor=palette[sidx], strokeWidth=2.2))
        d.add(Rect(30 + sidx * 35, 8, 6, 4, fillColor=palette[sidx], strokeColor=None))
        d.add(String(39 + sidx * 35, 8, f'Region {chr(65 + sidx)}', fontSize=8, fillColor=MUTED))
    d.scale(3, 3)
    return d


def bar_chart(title, values, labels):
    d = Drawing(CHART_W, CHART_H)
    chart_title(d, title)
    x0, y0, pw, ph = 30, 23, 108, 43
    d.add(Line(x0, y0, x0, y0 + ph, strokeColor=BLUE, strokeWidth=1.1))
    d.add(Line(x0, y0, x0 + pw, y0, strokeColor=BLUE, strokeWidth=1.1))
    max_value = max(values) or 1
    bar_w = 13
    gap = (pw - len(values) * bar_w) / (len(values) + 1)
    palette = [BLUE, colors.HexColor('#0369a1'), colors.HexColor('#059669'), colors.HexColor('#d97706'), colors.HexColor('#7c3aed')]
    for i, value in enumerate(values):
        x = x0 + gap + i * (bar_w + gap)
        h = value / max_value * ph
        d.add(Rect(x, y0, bar_w, h, fillColor=palette[i % len(palette)], strokeColor=None, rx=2, ry=2))
        d.add(String(x + bar_w / 2, 10, labels[i], textAnchor='middle', fontSize=7.2, fillColor=MUTED))
        d.add(String(x + bar_w / 2, y0 + h + 3, str(value), textAnchor='middle', fontSize=7, fillColor=INK))
    d.scale(3, 3)
    return d


def pie_chart(title, values, labels):
    d = Drawing(CHART_W, CHART_H)
    chart_title(d, title)
    palette = [BLUE, colors.HexColor('#059669'), colors.HexColor('#d97706'), colors.HexColor('#dc2626')]
    total = sum(values)
    start = 90
    for cx in (54, 103):
        local_start = start
        for i, value in enumerate(values):
            extent = -360 * value / total
            d.add(Wedge(cx, 43, 22, 22, local_start, extent, fillColor=palette[i % len(palette)], strokeColor=colors.white, strokeWidth=0.8))
            local_start += extent
    for i, label in enumerate(labels[:4]):
        d.add(Rect(25 + i * 31, 10, 6, 4, fillColor=palette[i], strokeColor=None))
        d.add(String(34 + i * 31, 10, label, fontSize=7.2, fillColor=MUTED))
    d.scale(3, 3)
    return d


def table_visual(title, rows):
    data = [[Paragraph(f'<b>{cell}</b>', ParagraphStyle('tvh', fontName='Helvetica-Bold', fontSize=9, leading=11, textColor=colors.white)) for cell in rows[0]]]
    data += [[Paragraph(str(cell), ParagraphStyle('tv', fontName='Helvetica', fontSize=8.5, leading=10, textColor=INK)) for cell in row] for row in rows[1:]]
    t = Table(data, colWidths=[CONTENT_W / len(rows[0])] * len(rows[0]), rowHeights=None)
    t.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), NAVY), ('GRID', (0, 0), (-1, -1), 0.3, LINE),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'), ('LEFTPADDING', (0, 0), (-1, -1), 7),
        ('RIGHTPADDING', (0, 0), (-1, -1), 7), ('TOPPADDING', (0, 0), (-1, -1), 7),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 7),
    ]))
    return [Paragraph(title, ParagraphStyle('tvtitle', fontName='Helvetica-Bold', fontSize=6.3, leading=8, textColor=NAVY)), t]


def process_visual(title, steps):
    d = Drawing(CHART_W, CHART_H)
    chart_title(d, title)
    x_positions = [8, 57, 106]
    for i, step in enumerate(steps[:3]):
        x = x_positions[i]
        d.add(Rect(x, 47, 40, 18, fillColor=PALE_BLUE, strokeColor=colors.HexColor('#b7c6e5'), rx=3, ry=3))
        d.add(Circle(x + 7, 56, 3.8, fillColor=BLUE, strokeColor=None))
        d.add(String(x + 7, 54.5, str(i + 1), textAnchor='middle', fontSize=7.5, fillColor=colors.white))
        d.add(String(x + 13, 55, step[:18], fontSize=7.2, fillColor=INK))
        if i < 2:
            d.add(Line(x + 40, 56, x_positions[i + 1] - 3, 56, strokeColor=BLUE, strokeWidth=1.8))
            d.add(Polygon([x_positions[i + 1] - 5, 59, x_positions[i + 1], 56, x_positions[i + 1] - 5, 53], fillColor=BLUE, strokeColor=None))
    if len(steps) > 3:
        for i, step in enumerate(steps[3:5]):
            x = 37 + i * 55
            d.add(Rect(x, 16, 42, 17, fillColor=PALE_GREEN, strokeColor=colors.HexColor('#a7ddc5'), rx=3, ry=3))
            d.add(String(x + 21, 23, step[:19], textAnchor='middle', fontSize=7, fillColor=INK))
            if i == 0:
                d.add(Line(87, 47, 87, 33, strokeColor=BLUE, strokeWidth=1.5))
    d.scale(3, 3)
    return d


def maps_visual(title, before, after):
    d = Drawing(CHART_W, CHART_H)
    chart_title(d, title)
    for base_x, label, items in [(8, 'Before', before), (82, 'After', after)]:
        d.add(String(base_x + 30, 68, label, textAnchor='middle', fontName='Helvetica-Bold', fontSize=9, fillColor=NAVY))
        for i, item in enumerate(items[:4]):
            x = base_x + (i % 2) * 31
            y = 42 - (i // 2) * 23
            d.add(Rect(x, y, 27, 16, fillColor=[PALE_GREEN, PALE_RED, PALE_BLUE, colors.HexColor('#fff7d6')][i], strokeColor=LINE, rx=2, ry=2))
            d.add(String(x + 13.5, y + 6.5, item[:14], textAnchor='middle', fontSize=6.5, fillColor=INK))
    d.add(Line(69, 40, 79, 40, strokeColor=BLUE, strokeWidth=1.8))
    d.add(Polygon([77, 43, 82, 40, 77, 37], fillColor=BLUE, strokeColor=None))
    d.scale(3, 3)
    return d


def callout(text, bg, border, styles):
    table = Table([[Paragraph(text, styles['body'])]], colWidths=[CONTENT_W])
    table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), bg), ('BOX', (0, 0), (-1, -1), 0.7, border),
        ('LEFTPADDING', (0, 0), (-1, -1), 9), ('RIGHTPADDING', (0, 0), (-1, -1), 9),
        ('TOPPADDING', (0, 0), (-1, -1), 8), ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
    ]))
    return table


def example_card(family, number, title, visual, prompt, model, analysis, styles):
    table = Table([[visual]], colWidths=[CONTENT_W])
    table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), PALE_BLUE), ('BOX', (0, 0), (-1, -1), 0.6, LINE),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'), ('LEFTPADDING', (0, 0), (-1, -1), 9),
        ('RIGHTPADDING', (0, 0), (-1, -1), 9), ('TOPPADDING', (0, 0), (-1, -1), 9),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 9),
    ]))
    return [PageBreak(), Paragraph(f'{family} - ejemplo {number}', styles['h1']), Paragraph(title, styles['h2']), table, Spacer(1, 4 * mm), Paragraph('<b>Enunciado del examen</b>', styles['label']), Paragraph(prompt, text_style(styles, f'prompt{family}{number}', 9.2, 13, INK)), Spacer(1, 2 * mm), callout(f'<b>Modelo de introduccion</b><br/>{model}', PALE_GREEN, colors.HexColor('#a7ddc5'), styles), Spacer(1, 2 * mm), Paragraph('<b>Por que funciona</b>', styles['label']), Paragraph(analysis, text_style(styles, f'analysis{family}{number}', 9, 13, MUTED))]


def build_examples(styles):
    examples = []
    line_data = [
        ('Internet access in three regions, 2000-2020', line_chart('Internet access (%)', [[.25, .55, .72, .88, .96], [.08, .22, .44, .67, .81], [.03, .05, .12, .31, .53]]), 'The line graph below shows the percentage of people with internet access in three regions between 2000 and 2020.', 'The line graph illustrates the proportion of the population with internet access in three regions over the period from 2000 to 2020.', 'It preserves the visual, measure, subjects and period without adding a trend.'),
        ('Public transport trips by mode, 2010-2025', line_chart('Journeys (millions)', [[.22, .38, .55, .48, .74], [.45, .42, .35, .52, .63], [.18, .28, .25, .31, .29]]), 'The line graph shows the number of journeys made by three forms of public transport between 2010 and 2025.', 'The line graph presents the number of journeys made by three modes of public transport over a fifteen-year period from 2010 to 2025.', 'Journeys and modes are natural substitutions; the time span remains explicit.'),
        ('Households using renewable energy, 2005-2025', line_chart('Households (%)', [[.18, .31, .55, .72, .86], [.32, .36, .42, .58, .65], [.08, .14, .20, .25, .34]]), 'The graph below shows the proportion of households using renewable energy in three countries from 2005 to 2025.', 'The graph depicts the share of households using renewable energy in three countries over the twenty-year period from 2005 to 2025.', 'The verbs depicts and share provide natural alternatives while preserving the scope.'),
        ('Average temperature in three cities, 1990-2020', line_chart('Temperature (C)', [[.35, .48, .40, .61, .72], [.22, .29, .38, .43, .55], [.55, .51, .58, .64, .69]]), 'The line graph below shows average temperatures in three cities between 1990 and 2020.', 'The line graph compares average temperatures in three cities over the thirty-year period from 1990 to 2020.', 'Compares is appropriate because the prompt presents multiple cities.'),
        ('Tourist arrivals in Spain and Portugal, 2005-2022', line_chart('Arrivals (millions)', [[.16, .24, .43, .58, .82], [.12, .20, .32, .48, .68]]), 'The line graph shows changes in the number of tourists visiting Spain and Portugal between 2005 and 2022.', 'The line graph illustrates changes in tourist arrivals in Spain and Portugal over the period from 2005 to 2022.', 'Tourist arrivals is a concise noun phrase for tourists visiting.'),
    ]
    bar_data = [
        ('Advertising spending in the UK, 2020', bar_chart('Spending (GBP bn)', [5.2, 7.1, 2.8, 1.4, 1.1], ['TV', 'Online', 'Print', 'Radio', 'Out']), 'The bar chart below shows the amount of money spent on different types of advertising in the UK in 2020.', 'The bar chart presents total expenditure on various categories of advertising in the United Kingdom in 2020.', 'It paraphrases amount of money and different types without interpreting the ranking.'),
        ('Water use in five sectors, 2005', bar_chart('Water use (bn L)', [46, 28, 18, 12, 8], ['Agri', 'Ind', 'House', 'Energy', 'Other']), 'The bar chart below shows water use in five sectors in 2005.', 'The bar chart presents water consumption across five sectors in 2005.', 'Consumption is a precise noun for use and the year is retained.'),
        ('Library visits by age group, 2012', bar_chart('Visits (thousands)', [18, 27, 21, 14], ['Under18', '18-35', '36-55', '56+']), 'The chart shows the number of library visits made by four age groups in 2012.', 'The chart illustrates the number of library visits recorded for four age groups in 2012.', 'Recorded for is a natural restructuring of made by.'),
        ('Household expenditure, 2024', bar_chart('Share (%)', [31, 24, 18, 15, 12], ['Food', 'Rent', 'Trans', 'Health', 'Other']), 'The bar chart shows household expenditure across five categories in 2024.', 'The bar chart provides data on household spending in five categories during 2024.', 'Provides data on works well when the task emphasizes information.'),
        ('University applicants by subject, 2018', bar_chart('Applicants', [42, 35, 28, 22, 18], ['Arts', 'Sci', 'Bus', 'Law', 'Edu']), 'The bar chart shows the number of university applicants for five subjects in 2018.', 'The bar chart compares applicant numbers for five university subjects in 2018.', 'Applicant numbers is concise and compares matches the multiple categories.'),
    ]
    pie_data = [
        ('Reasons for choosing online courses, 2024', pie_chart('Reasons (%)', [35, 28, 22, 15], ['Flex', 'Cost', 'Work', 'Other']), 'The pie charts show the reasons why students chose online courses in 2024.', "The pie charts provide information about students' reasons for choosing online courses in 2024.", 'The plural subject requires provide, not provides, and the apostrophe shows that the reasons belong to the students.'),
        ('Electricity generation in two countries', pie_chart('Sources (%)', [36, 24, 22, 18], ['Gas', 'Coal', 'Hydro', 'Solar']), 'The pie charts show electricity generation from four sources in two countries.', 'The two pie charts compare the shares of electricity generated from four sources in two countries.', 'Shares and generated from retain the unit of comparison.'),
        ('University subjects by gender, 2010', pie_chart('Students (%)', [45, 30, 15, 10], ['Eng', 'Sci', 'Arts', 'Bus']), 'The pie charts show the proportion of male and female students studying four subjects at a university in 2010.', 'The pie charts illustrate the proportion of male and female students enrolled in four subjects at a university in 2010.', 'Enrolled in is a natural academic equivalent of studying.'),
        ('Transport preferences in a city, 2022', pie_chart('Modes (%)', [42, 27, 19, 12], ['Car', 'Bus', 'Rail', 'Walk']), 'The charts show how residents travelled to work using four forms of transport in 2022.', 'The charts illustrate the distribution of commuting modes used by residents in 2022.', 'Distribution of commuting modes summarizes the category structure.'),
        ('Energy use in a household, 2025', pie_chart('Energy use (%)', [38, 26, 21, 15], ['Heat', 'Water', 'Light', 'Other']), 'The pie chart shows household energy use in four areas in 2025.', 'The pie chart presents household energy consumption across four areas in 2025.', 'The singular chart correctly takes presents.'),
    ]
    table_data = [
        ('International students by subject', table_visual('Students', [['Subject', '2015', '2025'], ['Business', '120', '180'], ['Science', '95', '145'], ['Arts', '80', '110'], ['Law', '60', '90']]), 'The table shows the number of international students enrolled in four subjects at a university in 2015 and 2025.', 'The table presents figures for international students studying four subjects at a university in 2015 and 2025.', 'Figures for is a compact way to introduce numerical data.'),
        ('Daily social media use by country', table_visual('Daily use (%)', [['Country', '18-29', '30-49'], ['Canada', '76', '61'], ['Spain', '72', '54'], ['Japan', '68', '49']]), 'The table below shows daily social media use among two age groups in three countries in 2023.', 'The table provides data on daily social media use among two age groups across three countries in 2023.', 'Across makes the comparison scope clear.'),
        ('Average commute time', table_visual('Minutes', [['City', 'Car', 'Bus'], ['A', '32', '45'], ['B', '28', '39'], ['C', '41', '52']]), 'The table shows average commuting times by car and bus in three cities.', 'The table compares average commuting times for car and bus users in three cities.', 'The introduction identifies the two modes and three cities without figures.'),
        ('Household recycling rates', table_visual('Rates (%)', [['Material', '2010', '2020'], ['Paper', '48', '64'], ['Glass', '35', '51'], ['Metal', '29', '44']]), 'The table shows the percentage of household waste recycled in three material categories in 2010 and 2020.', 'The table illustrates recycling rates for household waste across three material categories in 2010 and 2020.', 'Rates is the correct noun for percentages in this context.'),
        ('Cafeteria sales by day', table_visual('Sales', [['Day', 'Meals', 'Drinks'], ['Mon', '420', '380'], ['Wed', '510', '470'], ['Fri', '620', '590']]), 'The table shows cafeteria sales of meals and drinks on three days of a week.', 'The table presents cafeteria sales for meals and drinks on three days of the week.', 'The model stays neutral and avoids ranking the days.'),
    ]
    process_data = [
        ('Recycling plastic bottles', process_visual('Recycling process', ['Collection', 'Sorting', 'Washing', 'Melting', 'Manufacturing']), 'The diagram shows the process of recycling plastic bottles into new products.', 'The diagram illustrates the stages involved in recycling used plastic bottles to manufacture new products.', 'Stages involved describes the process without listing details.'),
        ('Manufacturing bricks', process_visual('Brick production', ['Clay digging', 'Crushing', 'Mixing', 'Moulding', 'Firing']), 'The diagram below shows how bricks are manufactured.', 'The diagram outlines the stages involved in manufacturing bricks.', 'Outlines is concise and the gerund keeps the process general.'),
        ('Producing coffee for sale', process_visual('Coffee production', ['Harvesting', 'Drying', 'Roasting', 'Grinding', 'Packaging']), 'The diagram shows how coffee is produced for sale.', 'The diagram illustrates the stages involved in producing coffee for sale.', 'For sale is retained because it defines the purpose of production.'),
        ('Wastewater treatment', process_visual('Water treatment', ['Screening', 'Settling', 'Aeration', 'Filtering', 'Discharge']), 'The diagram shows the stages used to treat wastewater before discharge.', 'The diagram depicts the process used to treat wastewater prior to discharge.', 'Prior to is a formal alternative to before.'),
        ('Glass bottle production', process_visual('Bottle production', ['Raw materials', 'Melting', 'Forming', 'Cooling', 'Inspection']), 'The diagram shows how glass bottles are produced from raw materials.', 'The diagram presents the stages through which raw materials are transformed into glass bottles.', 'Through which makes the sequence clear without overexplaining.'),
    ]
    map_data = [
        ('Town centre redevelopment, 1990-2020', maps_visual('Town centre', ['Park', 'Factory', 'Road', 'Car park'], ['Housing', 'School', 'Dual road', 'Shopping']), 'The maps show changes in a town centre between 1990 and 2020.', 'The maps illustrate how the layout of a town centre changed over the thirty-year period from 1990 to 2020.', 'Layout and changed are the key concepts for a map comparison.'),
        ('University campus development, 1995-2025', maps_visual('Campus', ['Library', 'Field', 'Road', 'Hall'], ['Library', 'Sports', 'Road', 'Flats']), 'The maps show the development of a university campus between 1995 and 2025.', 'The maps illustrate changes to the layout of a university campus over the thirty-year period from 1995 to 2025.', 'It describes physical changes, not the number of students.'),
        ('Shopping centre before and after redevelopment', maps_visual('Shopping centre', ['Car park', 'Shops', 'Cafe', 'Road'], ['Cinema', 'Shops', 'Food court', 'Road']), 'The maps show a shopping centre before and after redevelopment.', 'The two maps illustrate how the layout of a shopping centre changed after redevelopment.', 'Before and after is preserved through the time relationship.'),
        ('Park redevelopment, 1980-2020', maps_visual('Public park', ['Pond', 'Path', 'Trees', 'Gate'], ['Play area', 'Path', 'Cafe', 'Gate']), 'The maps show changes to a public park between 1980 and 2020.', 'The maps depict changes to the layout of a public park over the forty-year period from 1980 to 2020.', 'Depict is natural for a visual layout and the period is exact.'),
        ('Airport terminal expansion', maps_visual('Airport terminal', ['Terminal', 'Road', 'Car park', 'Field'], ['Terminal', 'Rail link', 'Car park', 'Hotel']), 'The maps show how an airport terminal area changed between 2000 and 2025.', 'The maps compare the arrangement of an airport terminal area in 2000 and 2025.', 'Arrangement is a precise alternative to layout for a place.'),
    ]
    groups = [('Line graphs', line_data), ('Bar charts', bar_data), ('Pie charts', pie_data), ('Tables', table_data), ('Process diagrams', process_data), ('Maps', map_data)]
    for family, rows in groups:
        examples += [PageBreak(), Paragraph(f'{family}: cinco referencias visuales', styles['h1']), Paragraph('Cada referencia ocupa una pagina para que el visual sea legible al imprimir. Estudia primero la grafica, identifica exactamente que muestra y luego compara el modelo con el enunciado.', styles['body'])]
        for number, row in enumerate(rows, 1):
            examples.extend(example_card(family, number, *row, styles))
    return examples


def build_motor(styles):
    items = [
        ('Nivel 1 - Construye la parafrasis', 'The bar chart below shows the amount of money spent on different types of advertising in the UK in 2020.', 'The bar chart ___ total expenditure ___ various categories ___ advertising in the United Kingdom in 2020.', ['presents / on / of', 'present / in / for', 'shows / at / from'], 'presents / on / of', 'The subject is singular and the collocations are natural: expenditure on categories of advertising.'),
        ('Nivel 1 - Construye la parafrasis', 'The table shows the number of international students enrolled in five subjects at a university in 2015 and 2025.', 'The table ___ figures for international students ___ five academic subjects at a university in 2015 and 2025.', ['presents / studying', 'present / study', 'provides / enrolled'], 'presents / studying', 'Presents agrees with table, and studying rephrases enrolled in without changing the meaning.'),
        ('Nivel 1 - Construye la parafrasis', 'The line graph shows the number of trips made by three forms of public transport between 2010 and 2025.', 'The line graph ___ the number of journeys made by three ___ of public transport from 2010 to 2025.', ['illustrates / modes', 'illustrate / mode', 'compares / types'], 'illustrates / modes', 'The visual and plural category are preserved, with natural academic vocabulary.'),
        ('Nivel 1 - Construye la parafrasis', 'The pie charts show the reasons why students chose online courses in 2024.', "The pie charts ___ information about students' reasons for ___ online courses in 2024.", ['give / choosing', 'gives / choose', 'presents / chose'], 'give / choosing', "The subject pie charts is plural, so give is correct; students' reasons for choosing is the natural noun pattern."),
        ('Nivel 2 - Elige una introduccion alineada', 'The graph below shows the percentage of people with internet access in three regions between 2000 and 2020.', 'Choose one: A) The line graph illustrates the proportion of the population with internet access in three regions over the period from 2000 to 2020. B) The graph shows that Region A rose from 30% to 88%. C) The pie chart compares three regions in 2020. D) The graph explains why access increased.', 'A', 'A preserves the visual, topic, scope and period without adding overview content.'),
        ('Nivel 2 - Elige una introduccion alineada', 'The maps show the development of a university campus between 1995 and 2025.', 'Choose one: A) The bar charts show campus facilities. B) The maps illustrate changes to the layout of a university campus over the thirty-year period from 1995 to 2025. C) The map proves the campus improved. D) The maps compare student numbers.', 'B', 'B identifies a map change, layout and period; the other choices change the task.'),
        ('Nivel 2 - Elige una introduccion alineada', 'The diagram shows how bricks are manufactured.', 'Choose one: A) The diagram compares brick prices. B) The process shows the best brick stage. C) The line graph presents clay data. D) The diagram outlines the stages involved in manufacturing bricks.', 'D', 'D gives a neutral process overview and avoids invented judgement or data.'),
        ('Nivel 2 - Elige una introduccion alineada', 'The pie charts show electricity generation from four sources in two countries.', 'Choose one: A) The pie charts show gas accounted for 36%. B) The two pie charts compare the shares of electricity generated from four sources in two countries. C) The charts explain why renewables are better. D) The bar charts compare four countries.', 'B', 'B retains comparison, sources and countries without specific figures.'),
        ('Nivel 3 - Revisa la respuesta', 'The diagram shows how coffee is produced for sale.', 'Response: The diagram shows cherries are harvested, dried and roasted in five exact steps. Is it suitable as an introduction?', 'No', 'It adds stage details and an exact number that belong in the body, not the introduction.'),
        ('Nivel 3 - Revisa la respuesta', 'The maps show a shopping centre before and after redevelopment.', 'Response: The two maps illustrate how the layout of a shopping centre changed after redevelopment. Is it suitable?', 'Yes', 'It identifies the visual, place and change while remaining neutral.'),
        ('Nivel 3 - Revisa la respuesta', 'The bar chart shows water use in five sectors in 2005.', 'Response: The graph explains why agriculture consumes so much water. Is it suitable?', 'No', 'It invents a cause and omits the five-sector comparison and the year.'),
        ('Nivel 3 - Revisa la respuesta', 'The table shows daily social media use among four age groups in three countries in 2023.', 'Response: The table provides data on daily social media use among four age groups across three countries in 2023. Is it suitable?', 'Yes', 'It keeps the visual, topic, groups, countries and year without adding numbers.'),
    ]
    story = [PageBreak(), Paragraph('Motor imprimible de practica', styles['h1']), Paragraph('Resuelve cada ejercicio sin mirar la clave. En el Nivel 1 completa los bloques de vocabulario; en el Nivel 2 elige la introduccion que conserva el significado; en el Nivel 3 revisa si la respuesta cumple la funcion de una introduccion.', styles['body']), callout('<b>Regla offline:</b> escribe tu respuesta en las lineas y consulta la clave solo al terminar todos los ejercicios.', PALE_RED, colors.HexColor('#f3b4b4'), styles), Spacer(1, 4 * mm)]
    answer_key = []
    for idx, item in enumerate(items, 1):
        if len(item) == 6:
            level, prompt, task, options, answer, explanation = item
        else:
            level, prompt, task, answer, explanation = item
            options = 'Escribe la letra de la mejor opcion: A, B, C o D.' if level.startswith('Nivel 2') else 'Escribe Yes o No y justifica tu decision.'
        option_text = '; '.join(options) if isinstance(options, list) else options
        response_lines = 'Tu respuesta: ________________________________________________<br/>Justificacion: ________________________________________________________________'
        story += [callout(f'<b>{idx}. {level}</b><br/><font color="#64708f">Enunciado:</font> {prompt}<br/><br/>{task}<br/><br/><b>Opciones:</b> {option_text}<br/><br/>{response_lines}', PALE_BLUE if idx % 2 else PALE_GREEN, LINE, styles), Spacer(1, 3 * mm)]
        answer_key.append(f'<b>{idx}. {answer}</b> - {explanation}')
    story += [PageBreak(), Paragraph('Clave y explicaciones', styles['h1']), Paragraph('Compara tus respuestas y marca qué tipo de error cometiste: vocabulario, concordancia, alcance del enunciado o informacion inventada.', styles['body'])]
    for idx, key in enumerate(answer_key, 1):
        story += [callout(key, PALE_GREEN if idx % 2 else PALE_BLUE, LINE, styles), Spacer(1, 2 * mm)]
    story += [Paragraph('Checklist final de autoevaluacion', styles['h2']), Paragraph('Antes de pasar al overview, comprueba: 1) el tipo de visual es correcto; 2) el tema conserva el significado; 3) el periodo o lugar aparece; 4) la gramatica concuerda; 5) no hay cifras, tendencias, causas ni opiniones.', styles['body'])]
    return story


def build():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    styles = brand_styles()
    story = [
        Paragraph('IELTS Academic Writing Task 1', styles['title']),
        Paragraph('Introduccion y paraphrasing - curso completo imprimible', styles['subtitle']),
        callout('<b>Guia de estudio WeLearn.</b> Este PDF contiene la explicacion, el vocabulario, treinta referencias visuales originales, modelos, practica graduada y respuestas explicadas.', PALE_BLUE, BLUE, styles),
        Spacer(1, 5 * mm), Paragraph('Como usar este material', styles['h1']),
        Paragraph('La introduccion es una o dos oraciones que explican que muestra el visual. No es un overview: no presenta tendencias, numeros concretos ni opiniones. Su trabajo es demostrar que entendiste el enunciado y puedes expresarlo sin copiarlo.', styles['body']),
        callout('<b>Formula base:</b> The [visual] <font color="#0369a1">illustrates / presents / compares / depicts</font> [tema parafraseado] [periodo o lugar].', PALE_GREEN, colors.HexColor('#a7ddc5'), styles),
        Paragraph('Tecnicas de paraphrasing', styles['h1']),
        Paragraph('1. Cambia el verbo: shows -> illustrates, presents, compares o depicts.<br/>2. Cambia sustantivos: percentage -> proportion, number -> figure, countries -> nations.<br/>3. Cambia la estructura: people using the internet -> the population with internet access.<br/>4. Conserva toda la informacion esencial y no agregues datos del grafico.', styles['body']),
        Paragraph('Banco de vocabulario', styles['h2']),
    ]
    vocab = [['Original', 'Alternativas naturales'], ['shows', 'illustrates, presents, compares, depicts'], ['percentage', 'proportion, share, rate'], ['number of', 'figure, total, quantity'], ['between X and Y', 'from X to Y, over the period X-Y'], ['people using', 'the population with, users of'], ['changes to', 'developments in, alterations to'], ['before and after', 'prior to and following redevelopment']]
    vt = Table([[Paragraph(f'<b>{c}</b>', styles['small']) for c in row] if i == 0 else [Paragraph(c, styles['small']) for c in row] for i, row in enumerate(vocab)], colWidths=[48 * mm, 126 * mm])
    vt.setStyle(TableStyle([('BACKGROUND', (0, 0), (-1, 0), NAVY), ('TEXTCOLOR', (0, 0), (-1, 0), colors.white), ('GRID', (0, 0), (-1, -1), 0.4, LINE), ('VALIGN', (0, 0), (-1, -1), 'TOP'), ('LEFTPADDING', (0, 0), (-1, -1), 7), ('RIGHTPADDING', (0, 0), (-1, -1), 7), ('TOPPADDING', (0, 0), (-1, -1), 5), ('BOTTOMPADDING', (0, 0), (-1, -1), 5)]))
    story += [vt, Paragraph('Checklist de precision', styles['h2']), Paragraph('Incluye tipo de visual, tema, periodo o lugar y unidad esencial. Excluye texto copiado, tendencias, cifras concretas, explicaciones causales y opiniones.', styles['body'])]
    story += build_examples(styles)
    story += build_motor(styles)
    story += [Spacer(1, 4 * mm), callout('<b>Uso y propiedad intelectual.</b> Material original propiedad de Idiomas WeLearn. Este recurso no es un documento oficial de IELTS ni utiliza sus logotipos. Consulta mas practica en <link href="https://www.idiomaswl.com">https://www.idiomaswl.com</link>.', PALE_RED, colors.HexColor('#f3b4b4'), styles)]
    doc = WeLearnDocTemplate(str(OUTPUT), logo_path=str(LOGO), title='IELTS Writing Task 1 - Curso completo de introduccion y paraphrasing', author='Idiomas WeLearn')
    doc.build(story)
    print(OUTPUT)


if __name__ == '__main__':
    build()
