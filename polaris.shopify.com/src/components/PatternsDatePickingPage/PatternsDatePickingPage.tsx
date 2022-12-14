import React, {useEffect, useState} from 'react';
import {Tab} from '@headlessui/react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import StatusBadge from '../StatusBadge';
import {StatusName} from '../../types';
import PageMeta from '../PageMeta';
import {Stack, Row} from '../Stack';
import {Lede} from '../Lede';
import {Heading} from '../Heading';
import {TableContainer, Table, Tbody, TableCaption, Tr, Td} from '../Table';
import PatternsExample, {type PatternExample} from '../PatternsExample';
import Page from '../Page';
import styles from './PatternsDatePickingPage.module.scss';
import {Grid, GridItem} from '../Grid';

type Pattern = {
  index: number;
  title: string;
  slug: string;
  designDecisionListItems?: string[];
  designDecisions?: {
    listItems?: string[];
    image?: boolean;
  };
  example: PatternExample;
};
const title = 'Date picking';

const newDiscussionLink = `https://github.com/Shopify/polaris/discussions/new?category=pattern-documentation&title=[${encodeURIComponent(
  title,
)}]`;
const knownIssuesLink = `https://github.com/Shopify/polaris/issues?q=is%3Aopen+is%3Aissue+label%3APattern+${encodeURIComponent(
  title,
)}`;
const patternsIndex = [
  'single-date-picker',
  'date-range-picker',
  'quick-picker',
];
const patterns: Record<string, Pattern> = {
  'single-date-picker': {
    index: 0,
    title: 'Single date picker',
    slug: 'single-date-picker',
    example: {
      description:
        "The date range picker gives merchants multiple options for selecting a date range. The list has preset dates for efficient picking, and the inputs + calendar work together to verify the merchant's selection. The benefit is how the different options work together for flexilibity with complex date picking tasks.",
      code: `
    {(function DatePickerPattern () {
      const [{month, year}, setDate] = useState({month: 1, year: 2018});
      const [selectedDates, setSelectedDates] = useState({
        start: new Date('Wed Feb 07 2018 00:00:00 GMT-0500 (EST)'),
        end: new Date('Wed Feb 07 2018 00:00:00 GMT-0500 (EST)'),
      });
      const handleMonthChange = useCallback(
        (month, year) => setDate({month, year}),
        [],
      );
      return (
        <DatePicker
          month={month}
          year={year}
          onChange={setSelectedDates}
          onMonthChange={handleMonthChange}
          selected={selectedDates}
        />
      );
    })()}`,
      context: `
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      alignItems: 'center',
      justifyContent: 'center',
      paddingLeft: '32px',
      paddingRight: '32px',
    }}>
      <div style={{ width: '100%' }}>
        ____CODE____
      </div>
    </div>
    `,
      snippetCode: `
    function DatePickerPattern () {
      const [{month, year}, setDate] = useState({month: 1, year: 2018});
      const [selectedDates, setSelectedDates] = useState({
        start: new Date('Wed Feb 07 2018 00:00:00 GMT-0500 (EST)'),
        end: new Date('Wed Feb 07 2018 00:00:00 GMT-0500 (EST)'),
      });
      const handleMonthChange = useCallback(
        (month, year) => setDate({month, year}),
        [],
      );
      return (
        <DatePicker
          month={month}
          year={year}
          onChange={setSelectedDates}
          onMonthChange={handleMonthChange}
          selected={selectedDates}
        />
      );
    }
        `,
    },
  },
  'date-range-picker': {
    index: 1,
    title: 'Date range picker',
    slug: 'date-range-picker',
    example: {
      description:
        'The single date picker enables merchants to type a specific date or pick it from a calendar. Having a single input is useful when merchants need to confidently confirm a date without being overwhelmed by other picking options.',
      code: ` <Page
      divider
      primaryAction={{ content: "View on your store", disabled: true }}
      secondaryActions={[
        {
          content: "Duplicate",
          accessibilityLabel: "Secondary action label",
          onAction: () => alert("Duplicate action"),
        },
      ]}
    >
      <AlphaStack gap="16">
        <Columns columns={{ xs: "1fr", md: "2fr 5fr" }}>
          <Box as="section">
            <AlphaStack>
              <Text as="h3" variant="headingMd">
                InterJambs
              </Text>
              <Text as="p" variant="bodyMd">
                Interjambs are the rounded protruding bits of your puzzlie piece
              </Text>
            </AlphaStack>
          </Box>
          <AlphaCard>
            <AlphaStack fullWidth>
              <TextField label="Interjamb style" />
              <TextField label="Interjamb ratio" />
            </AlphaStack>
          </AlphaCard>
        </Columns>
        <Columns columns={{ xs: "1fr", md: "2fr 5fr" }}>
          <Box as="section">
            <AlphaStack>
              <Text as="h3" variant="headingMd">
                Dimensions
              </Text>
              <Text as="p" variant="bodyMd">
                Interjambs are the rounded protruding bits of your puzzlie piece
              </Text>
            </AlphaStack>
          </Box>
          <AlphaCard>
            <AlphaStack fullWidth>
              <TextField label="Horizontal" />
              <TextField label="Interjamb ratio" />
            </AlphaStack>
          </AlphaCard>
        </Columns>
      </AlphaStack>
    </Page>`,
    },
  },
  'quick-picker': {
    index: 2,
    title: 'Quick picker',
    slug: 'quick-picker',
    example: {
      description:
        'The quick picker helps merchants quickly select a single or date range from a list of pre-customized dates. This is useful when merchants need to quickly and simply filter information.',
      context: `<div style={{
        display: 'flex',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: '32px',
        paddingRight: '32px',
      }}>
        <div style={{ width: '100%' }}>
          ____CODE____
        </div>
      </div>`,
      code: `
      <Columns columns={{ xs: "1fr", md: "2fr 5fr" }}>
      <Box as="section">
        <AlphaStack>
          <Text as="h3" variant="headingMd">
            InterJambs
          </Text>
          <Text as="p" variant="bodyMd">
            Interjambs are the rounded protruding bits of your puzzlie piece
          </Text>
        </AlphaStack>
      </Box>
      <AlphaCard>
        <AlphaStack fullWidth>
          <TextField label="Interjamb style" />
          <TextField label="Interjamb ratio" />
        </AlphaStack>
      </AlphaCard>
    </Columns>
      `,
    },
  },
};

const Preview = () => {
  return (
    <div className={styles.Preview}>
      <div className={styles.PreviewInner} />
    </div>
  );
};

export default function PatternsDatePickingPage() {
  const [exampleIndex, setExampleIndex] = useState(0);
  const {query, replace, isReady} = useRouter();
  const onTabChange = (index: number) => {
    setExampleIndex(index);
    replace(
      {
        query: {
          ...query,
          tab: patternsIndex[index],
        },
      },
      undefined,
      {shallow: true},
    );
  };

  useEffect(() => {
    // We don't expect query.tab to ever be an array of values
    // However this is supported by the spec
    // So we exclude this case in our check.
    if (query.tab && typeof query.tab === 'string' && isReady) {
      console.log(query.tab);
      const index = patterns[query.tab as string]?.index;
      setExampleIndex(index);
    }
  }, [query.tab, isReady]);
  const description =
    'This layout pattern makes it easy for merchants to scan groups of settings and make desired changes';

  useEffect(() => {
    setExampleIndex(0);
  }, []);

  return (
    <>
      <PageMeta title={title} description={description} />

      <Page showTOC={false}>
        <Stack gap="4">
          <Heading as="h1">
            <Row wrap gap="2" className={styles.Heading}>
              {title}{' '}
              <StatusBadge status={{value: StatusName.Beta, message: ''}} />
            </Row>
          </Heading>
          <Lede>{description}</Lede>
          <p className={styles.InfoLine}>
            Maintainer: Core Optimize •{' '}
            <Link className={styles.InfoLineLink} href={newDiscussionLink}>
              Discuss on GitHub
            </Link>{' '}
            •{' '}
            <Link className={styles.InfoLineLink} href={knownIssuesLink}>
              {' '}
              Known issues
            </Link>
          </p>
        </Stack>
        <Tab.Group
          defaultIndex={0}
          selectedIndex={exampleIndex}
          onChange={onTabChange}
        >
          <div className={styles.TabGroup}>
            <Tab.List>
              <div className={styles.ExamplesList} id="examples">
                <Tab>
                  <span>{patterns['single-date-picker'].title}</span>
                </Tab>
                <Tab>
                  <span>{patterns['date-range-picker'].title}</span>
                </Tab>
                <Tab>
                  <span>{patterns['quick-picker'].title}</span>
                </Tab>
              </div>
            </Tab.List>

            <Tab.Panels>
              <Tab.Panel className={styles.Panel}>
                <Stack gap="8">
                  <Stack as="section" gap="4">
                    <PatternsExample
                      example={patterns['single-date-picker'].example}
                      patternName={`${title} > ${patterns['single-date-picker'].title}`}
                      relatedComponents={[
                        {label: 'Button', url: '/components/button'},
                        {label: 'TextFields', url: '/components/text-field'},
                      ]}
                    />
                  </Stack>
                  <Stack as="section" gap="4">
                    <Heading as="h2">
                      How the {`${patterns['single-date-picker'].title}`} helps
                      merchants
                    </Heading>
                    <div className={styles.MerchantGoal}>
                      <div>
                        <ol className={styles.MerchantGoalOL}>
                          <li>
                            The text input gives merchants the option to use the
                            keyboard to enter a date.
                          </li>
                          <li>
                            A single month calendar is previewed after selecting
                            the date input to provide visual affordance of the
                            single date picked. The calendar can then be used to
                            select a new date.
                          </li>
                        </ol>
                      </div>
                      <div className={styles.ImageWrapper}></div>
                    </div>
                  </Stack>
                  <Stack gap="4">
                    <Heading as="h2">When to use</Heading>
                    <TableContainer>
                      <Table>
                        <TableCaption className={styles.WhenToUseCaption}>
                          Use when merchants need to:
                        </TableCaption>
                        <Tbody>
                          <Tr>
                            <Td className={styles.UseCase} shrink>
                              Set activation dates Found in: Discounts
                            </Td>
                            <Td>
                              Merchants can set a start date for when a discount
                              becomes active. This pattern variant can be used
                              along with the option to add a start time, and
                              merchants can select a checkbox to add an end date
                              and time using the same variant.
                            </Td>
                          </Tr>
                          <Tr>
                            <Td className={styles.UseCase} shrink>
                              Set visibility dates for a page Found in: Online
                              store / add a page
                            </Td>
                            <Td>
                              A merchant needs to set a visibility date for a
                              new page that they have created for their online
                              store. This simplified date picking pattern is
                              useful for this task because only a single date is
                              required to be inputted for a merchant job to be
                              done, elimenating any unneccersary friction
                              throughout the experience.
                            </Td>
                          </Tr>
                          <Tr>
                            <Td className={styles.UseCase} shrink>
                              Estimated arrival date Found in: Product /
                              transfers
                            </Td>
                            <Td>
                              A merchant needs to provide an estimated arrival
                              date for their shipment details. For this task
                              only a single date is required from the merchant
                              as a benchmark date for inventory transfers.
                            </Td>
                          </Tr>
                        </Tbody>
                      </Table>
                    </TableContainer>
                  </Stack>
                  <Stack as="section" gap="4">
                    <Heading as="h2">
                      Useful to know about the{' '}
                      {patterns['single-date-picker'].title}
                    </Heading>
                    <ul className={styles.UsageGuidelinesWrapper}>
                      <li className={styles.UsageGuidelinesEl}>
                        <div className={styles.ImageWrapper} />
                        <div className={styles.UsageGuidelineTxt}>
                          <p>
                            {`For text inputs, display the contextual date so that the
                        format is easily understood and familiar. On focus,
                        present the date in the proper format to edit
                        (YYYY-MM-DD)`}
                          </p>
                        </div>
                      </li>
                      <li className={styles.UsageGuidelinesEl}>
                        <div className={styles.ImageWrapper} />
                        <div className={styles.UsageGuidelineTxt}>
                          <p>
                            Labels need to simply depict the task at hand.
                            Whether that be a start date, end date, start time
                            etc.
                          </p>
                        </div>
                      </li>
                      <li className={styles.UsageGuidelinesEl}>
                        <div className={styles.ImageWrapper} />
                        <div className={styles.UsageGuidelineTxt}>
                          <p>
                            This pattern can be duplicated to allow users to add
                            an end date or time.
                          </p>
                        </div>
                      </li>
                    </ul>
                  </Stack>
                </Stack>
              </Tab.Panel>
              <Tab.Panel className={styles.Panel}>
                <Stack gap="8">
                  <Stack as="section" gap="4">
                    <PatternsExample
                      example={patterns['date-range-picker'].example}
                      patternName={`${title} > ${patterns['date-range-picker'].title}`}
                      relatedComponents={[
                        {label: 'Button', url: '/components/button'},
                        {label: 'TextFields', url: '/components/text-field'},
                      ]}
                    />
                  </Stack>
                  <Stack as="section" gap="4">
                    <Heading as="h2">
                      How the {`${patterns['date-range-picker'].title}`} helps
                      merchants
                    </Heading>
                    <div className={styles.MerchantGoal}>
                      <div>
                        <ol className={styles.MerchantGoalOL}>
                          <li>
                            The option list enables merchants to efficiently
                            scroll and pick through a list of commonly used
                            dates, like Today, Yesterday, or Last 7 days.
                          </li>
                          <li>
                            The calendar provides a way for merchants to browse
                            dates visually and customize their selection.
                          </li>
                          <li>
                            {`The dual text input gives merchants the option to
                            use the keyboard to enter dates if the calendar
                            isn’t accessible or the efficient option, or when
                            the pre-picks don't offer the selections the
                            merchant wants. It’s usually used when merchants
                            know exactly the dates they need. Example: it would
                            be easier to type a date range that spans 2 years
                            vs. browsing via the calendar.`}
                          </li>
                          <li>
                            The footer provides the merchant with a moment to
                            review their date selection before they confirm what
                            they want to schedule, filter, or publish.
                          </li>
                        </ol>
                      </div>
                      <div className={styles.ImageWrapper}></div>
                    </div>
                  </Stack>
                  <Stack gap="4">
                    <Heading as="h2">When to use</Heading>
                    <TableContainer>
                      <Table>
                        <TableCaption className={styles.WhenToUseCaption}>
                          Use when merchants need to:
                        </TableCaption>
                        <Tbody>
                          <Tr>
                            <Td className={styles.UseCase} shrink>
                              Analyze trends and data
                              <p>Found in: Analytics</p>
                            </Td>
                            <Td>
                              Merchants need to efficiently view their business
                              metrics so that they can learn and make decisions.
                              To do this, they can use the single date picker to
                              filter and frame data for certain time periods.
                            </Td>
                          </Tr>
                          <Tr>
                            <Td className={styles.UseCase} shrink>
                              Reviewing reports and forecasting
                              <p>Found in: Reports</p>
                            </Td>
                            <Td>
                              Merchants need to review reports from past dates
                              to observe in-depth analytics. This pattern
                              enables merchants to freely pick dates that will
                              in turn populate data related to those dates on
                              the page.
                            </Td>
                          </Tr>
                          <Tr>
                            <Td className={styles.UseCase} shrink>
                              Viewing marketing campaign metrics
                              <p>Found in: Marketing</p>
                            </Td>
                            <Td>
                              A merchant needs to view traffic and conversion
                              attributed to marketing campaigns. Filtering
                              through all types of date ranges from the past is
                              essential for this task. The date picking pattern
                              allows merchants to visualize statistics related
                              to there date selections.
                            </Td>
                          </Tr>
                        </Tbody>
                      </Table>
                    </TableContainer>
                  </Stack>
                  <Stack as="section" gap="4">
                    <Heading as="h2">
                      Useful to know about the{' '}
                      {patterns['date-range-picker'].title}
                    </Heading>
                    <ul className={styles.UsageGuidelinesWrapper}>
                      <li className={styles.UsageGuidelinesEl}>
                        <div className={styles.ImageWrapper} />
                        <div className={styles.UsageGuidelineTxt}>
                          <p>
                            In the button preview, set a default date range that
                            is most likely to be used by a merchant.
                          </p>
                        </div>
                      </li>
                      <li className={styles.UsageGuidelinesEl}>
                        <div className={styles.ImageWrapper} />
                        <div className={styles.UsageGuidelineTxt}>
                          <p>
                            Single dates should be at the top of the list,
                            followed by date ranges from smallest to largest
                            ranges.
                          </p>
                        </div>
                      </li>
                    </ul>
                  </Stack>
                </Stack>
              </Tab.Panel>
              <Tab.Panel className={styles.Panel}>
                <Stack gap="8">
                  <Stack as="section" gap="4">
                    <PatternsExample
                      example={patterns['quick-picker'].example}
                      patternName={`${title} > ${patterns['quick-picker'].title}`}
                      relatedComponents={[
                        {label: 'Button', url: '/components/button'},
                        {label: 'TextFields', url: '/components/text-field'},
                      ]}
                    />
                  </Stack>
                  <Stack as="section" gap="4">
                    <Heading as="h2">
                      How the {`${patterns['quick-picker'].title}`} helps
                      merchants
                    </Heading>
                    <div className={styles.MerchantGoal}>
                      <div>
                        <ol className={styles.MerchantGoalOL}>
                          <li>
                            Button shows the current date selection that is
                            being filtered triggering a popover with dates to
                            pick from.
                          </li>
                          <li>
                            The list date picker provides a list of dates to
                            choose from within an option list component. Varying
                            between single and ranges of dates
                          </li>
                        </ol>
                      </div>
                      <div className={styles.ImageWrapper}></div>
                    </div>
                  </Stack>
                  <Stack gap="4">
                    <Heading as="h2">When to use</Heading>
                    <TableContainer>
                      <Table>
                        <TableCaption className={styles.WhenToUseCaption}>
                          Use when merchants need to:
                        </TableCaption>
                        <Tbody>
                          <Tr>
                            <Td className={styles.UseCase} shrink>
                              Selecting periodic intervals
                              <p>Found in: Sales report</p>
                            </Td>
                            <Td>
                              Merchants can select specific date intervals to
                              view sales data during that time period. This list
                              can offer: Hourly, Daily, Weekly, Monthly, and By
                              hour of the day as options to choose from.
                            </Td>
                          </Tr>
                          <Tr>
                            <Td className={styles.UseCase} shrink>
                              Applying a date filter for customer segments
                              <p>Found in: Customer segment</p>
                            </Td>
                            <Td>
                              A merchant needs to create a customer segment to
                              group customers according to how and why they buy.
                              When creating a customer segment, a merchant at
                              times needs to apply date filters for when a
                              customer is first added, their first order date,
                              abandoned checkout date etc. The list date picker
                              pattern provides flexible uses for all types of
                              listed date groupings.
                            </Td>
                          </Tr>
                          <Tr>
                            <Td className={styles.UseCase} shrink>
                              Templated dates
                              <p>Found in: Inbox / Overview</p>
                            </Td>
                            <Td>
                              A merchant needs to simply view metrics related to
                              the Shopify chat inbox. Conversions and response
                              times are subject matters that are viewed from
                              filtering dates. A templated list of dates is
                              sufficient for this task because it is a task that
                              does not require in-depth filtering of historical
                              information.
                            </Td>
                          </Tr>
                        </Tbody>
                      </Table>
                    </TableContainer>
                  </Stack>
                  <Stack as="section" gap="4">
                    <Heading as="h2">
                      Useful to know about the {patterns['quick-picker'].title}
                    </Heading>
                    <ul className={styles.UsageGuidelinesWrapper}>
                      <li className={styles.UsageGuidelinesEl}>
                        <div className={styles.ImageWrapper} />
                        <div className={styles.UsageGuidelineTxt}>
                          <p>
                            In the button preview, set a default date range that
                            is most likely to be used by a merchant.
                          </p>
                        </div>
                      </li>
                      <li className={styles.UsageGuidelinesEl}>
                        <div className={styles.ImageWrapper} />
                        <div className={styles.UsageGuidelineTxt}>
                          <p>
                            Single dates should be at the top of the list,
                            followed by date ranges from smallest to largest
                            ranges.
                          </p>
                        </div>
                      </li>
                    </ul>
                  </Stack>
                </Stack>
              </Tab.Panel>
            </Tab.Panels>
            <Stack as="section" gap="4">
              <Heading as="h2">Related resources</Heading>
              <Grid gapX="4" gapY="6" itemMinWidth="24rem">
                <GridItem
                  title="Date picker"
                  description="Date pickers let merchants choose dates from a visual calendar that’s consistently applied wherever dates need to be selected across Shopify."
                  url="/components/date-picker"
                  renderPreview={() => <Preview />}
                />
                <GridItem
                  title="UTC is for everyone right?"
                  description="Programming with dates, times, and timezones is hard. But here's some help."
                  url="https://zachholman.com/talk/utc-is-enough-for-everyone-right"
                  renderPreview={() => <Preview />}
                />
                <GridItem
                  title="Grammar and mechanics"
                  description="This guide is to help designers, developers, recruiters, UX-ers, product managers, support advisors, or anyone who writes public-facing text for Shopify."
                  url="/content/grammar-and-mechanics#date"
                  renderPreview={() => <Preview />}
                />
                <GridItem
                  title="Actionable language"
                  description="Merchants use Shopify to get things done. Content should be written and structured to help them understand and take the most important actions."
                  url="/content/actionable-language"
                  renderPreview={() => <Preview />}
                />
              </Grid>
            </Stack>
          </div>
        </Tab.Group>
      </Page>
    </>
  );
}
