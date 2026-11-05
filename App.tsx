import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { supabase } from './lib/supabase';

type InvestmentType = 'Residential' | 'Commercial' | 'Business';

type Parcel = {
  id: string;
  name: string;
  location: string;
  area_m2: number;
  price_eur: number;
  suitability_score: number;
  is_demo: boolean;
  created_at: string;
};

type InvestmentRequest = {
  id: string;
  investment_type: string;
  location: string;
  budget_eur: number;
  created_at: string;
};

const INVESTMENT_TYPES: { name: InvestmentType; icon: string }[] = [
  { name: 'Residential', icon: '⌂' },
  { name: 'Commercial', icon: '▦' },
  { name: 'Business', icon: '↗' },
];

const LOCATIONS = ['Mitrovica', 'Prishtina', 'Peja'];

/*
  {
    id: 'DEMO PARCEL A',
    neighborhood: 'Example zone A',
    area: '1,200 m²',
    price: '€48,000',
    score: 86,
  },
  {
    id: 'DEMO PARCEL B',
    neighborhood: 'Example zone B',
    area: '850 m²',
    price: '€36,500',
    score: 78,
  },
  {
    id: 'DEMO PARCEL C',
    neighborhood: 'Example zone C',
    area: '1,600 m²',
    price: '€62,000',
    score: 72,
  },
];

*/

export default function App() {
  const [investmentType, setInvestmentType] =
    useState<InvestmentType>('Residential');
  const [location, setLocation] = useState('Mitrovica');
  const [minimumArea, setMinimumArea] = useState('');
  const [maximumBudget, setMaximumBudget] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [requests, setRequests] = useState<InvestmentRequest[]>([]);
  const [isLoadingRequests, setIsLoadingRequests] = useState(true);
  const [requestsError, setRequestsError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [formMessage, setFormMessage] = useState<string | null>(null);
  const [parcels, setParcels] = useState<Parcel[]>([]);
  const [isLoadingParcels, setIsLoadingParcels] = useState(false);
  const [parcelsError, setParcelsError] = useState<string | null>(null);

  const fetchRequests = async () => {
    setIsLoadingRequests(true);
    setRequestsError(null);

    const { data, error } = await supabase
      .from('investment_requests')
      .select('id, investment_type, location, budget_eur, created_at')
      .order('created_at', { ascending: false });

    if (error) {
      setRequestsError(error.message);
      setIsLoadingRequests(false);
      return;
    }

    setRequests(data ?? []);
    setIsLoadingRequests(false);
  };

  useEffect(() => {
    void fetchRequests();
  }, []);

  const fetchParcels = async () => {
    const minimumAreaValue = Number(minimumArea.trim());
    const maximumBudgetValue = Number(maximumBudget.replace(/,/g, '').trim());

    setIsLoadingParcels(true);
    setParcelsError(null);

    const { data, error } = await supabase
      .from('parcels')
      .select(
        'id, name, location, area_m2, price_eur, suitability_score, is_demo, created_at'
      )
      .eq('location', location)
      .gte('area_m2', minimumAreaValue)
      .lte('price_eur', maximumBudgetValue)
      .eq('is_demo', true)
      .order('created_at', { ascending: false });

    if (error) {
      setParcelsError(error.message);
      setIsLoadingParcels(false);
      return;
    }

    setParcels(data ?? []);
    setIsLoadingParcels(false);
  };

  const handleSaveRequest = async () => {
    setFormMessage(null);
    const normalizedMinimumArea = minimumArea.trim();
    const normalizedBudget = maximumBudget.replace(/,/g, '').trim();
    const area = Number(normalizedMinimumArea);
    const budget = Number(normalizedBudget);

    if (!investmentType || !location || !normalizedMinimumArea || !normalizedBudget) {
      setFormMessage(
        'Please select an investment type and location, and enter area and budget.'
      );
      return;
    }

    if (!Number.isInteger(area) || area <= 0) {
      setFormMessage('Minimum area must be a positive whole number in m².');
      return;
    }

    if (!Number.isInteger(budget) || budget <= 0) {
      setFormMessage('Budget must be a positive whole number in euros.');
      return;
    }

    setIsSaving(true);
    const { error } = await supabase.from('investment_requests').insert({
      investment_type: investmentType,
      location,
      budget_eur: budget,
    });

    setFormMessage(
      error
        ? `Could not save request: ${error.message}`
        : 'Investment request saved successfully.'
    );
    setShowResults(true);
    await fetchParcels();
    setIsSaving(false);
    if (!error) {
      await fetchRequests();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.brandRow}>
            <View style={styles.brandMark}>
              <View style={styles.brandMarkInner} />
            </View>
            <View>
              <Text style={styles.brandName}>LAND INTELLIGENCE</Text>
              <Text style={styles.brandRegion}>KOSOVO</Text>
            </View>
            <View style={styles.prototypeTag}>
              <Text style={styles.prototypeTagText}>PROTOTYPE</Text>
            </View>
          </View>

          <View style={styles.hero}>
            <View style={styles.eyebrow}>
              <View style={styles.eyebrowDot} />
              <Text style={styles.eyebrowText}>PARCEL DISCOVERY</Text>
            </View>
            <Text style={styles.title}>Find land for your next big idea.</Text>
            <Text style={styles.subtitle}>
              Set your investment criteria to explore land parcel examples
              across Kosovo.
            </Text>
          </View>

          <View style={styles.formCard}>
            <View style={styles.sectionHeading}>
              <Text style={styles.sectionNumber}>01</Text>
              <Text style={styles.sectionTitle}>Investment type</Text>
            </View>

            <View style={styles.investmentOptions}>
              {INVESTMENT_TYPES.map((option) => {
                const selected = investmentType === option.name;
                return (
                  <Pressable
                    key={option.name}
                    accessibilityRole="radio"
                    accessibilityState={{ checked: selected }}
                    onPress={() => setInvestmentType(option.name)}
                    style={[
                      styles.investmentOption,
                      selected && styles.investmentOptionSelected,
                    ]}
                  >
                    <Text
                      style={[
                        styles.optionIcon,
                        selected && styles.optionIconSelected,
                      ]}
                    >
                      {option.icon}
                    </Text>
                    <Text
                      numberOfLines={1}
                      style={[
                        styles.optionLabel,
                        selected && styles.optionLabelSelected,
                      ]}
                    >
                      {option.name}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Preferred location</Text>
              <View style={styles.locationOptions}>
                {LOCATIONS.map((option) => {
                  const selected = location === option;
                  return (
                    <Pressable
                      key={option}
                      accessibilityRole="radio"
                      accessibilityState={{ checked: selected }}
                      onPress={() => setLocation(option)}
                      style={[
                        styles.locationOption,
                        selected && styles.locationOptionSelected,
                      ]}
                    >
                      <Text
                        style={[
                          styles.locationOptionText,
                          selected && styles.locationOptionTextSelected,
                        ]}
                      >
                        {option}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
              <Text style={styles.helperText}>
                Choose a municipality to explore.
              </Text>
            </View>

            <View style={styles.criteriaRow}>
              <View style={[styles.fieldGroup, styles.criteriaField]}>
                <Text style={styles.fieldLabel}>Minimum land area</Text>
                <View style={styles.inputWrap}>
                  <TextInput
                    accessibilityLabel="Minimum land area in square meters"
                    keyboardType="decimal-pad"
                    onChangeText={setMinimumArea}
                    placeholder="e.g. 500"
                    placeholderTextColor={COLORS.placeholder}
                    returnKeyType="done"
                    style={styles.input}
                    value={minimumArea}
                  />
                  <Text style={styles.inputSuffix}>m²</Text>
                </View>
              </View>
              <View style={[styles.fieldGroup, styles.criteriaField]}>
                <Text style={styles.fieldLabel}>Maximum budget</Text>
                <View style={styles.inputWrap}>
                  <Text style={styles.inputPrefix}>€</Text>
                  <TextInput
                    accessibilityLabel="Maximum budget in euros"
                    keyboardType="decimal-pad"
                    onChangeText={setMaximumBudget}
                    placeholder="e.g. 50,000"
                    placeholderTextColor={COLORS.placeholder}
                    returnKeyType="done"
                    style={styles.input}
                    value={maximumBudget}
                  />
                </View>
              </View>
            </View>

            <Pressable
              accessibilityRole="button"
              disabled={isSaving}
              onPress={() => void handleSaveRequest()}
              style={({ pressed }) => [
                styles.findButton,
                pressed && styles.findButtonPressed,
              ]}
            >
              <Text style={styles.findButtonText}>
                {isSaving ? 'Saving request...' : 'Save & Find Suitable Land'}
              </Text>
              <Text style={styles.findButtonArrow}>→</Text>
            </Pressable>
            <Text style={styles.buttonNote}>
              The minimum area is used for the demo search and is not saved.
            </Text>
            {formMessage && (
              <Text style={styles.formMessage}>{formMessage}</Text>
            )}
          </View>

          {showResults && (
            <View style={styles.resultsSection}>
              <View style={styles.resultsHeadingRow}>
                <View>
                  <Text style={styles.resultsEyebrow}>YOUR SEARCH</Text>
                  <Text style={styles.resultsTitle}>Available parcels</Text>
                </View>
                <View style={styles.demoBadge}>
                  <Text style={styles.demoBadgeText}>DEMO DATA</Text>
                </View>
              </View>
              <Text style={styles.resultsDescription}>
                {investmentType} · {location}
                {'\n'}These synthetic examples and scores are for demonstration
                only, not verified investment assessments.
              </Text>
              <Text style={styles.resultsDescription}>
                Filtered demo records loaded from Supabase. Suitability scores
                are illustrative only and are not verified assessments.
              </Text>
              {isLoadingParcels && (
                <Text style={styles.stateText}>Loading parcel results...</Text>
              )}
              {!isLoadingParcels && parcelsError && (
                <View>
                  <Text style={styles.errorText}>{parcelsError}</Text>
                  <Pressable
                    accessibilityRole="button"
                    onPress={() => void fetchParcels()}
                    style={styles.retryButton}
                  >
                    <Text style={styles.retryButtonText}>Try again</Text>
                  </Pressable>
                </View>
              )}
              {!isLoadingParcels && !parcelsError && parcels.length === 0 && (
                <Text style={styles.stateText}>
                  No demo parcels match these criteria.
                </Text>
              )}
              {!isLoadingParcels && !parcelsError && parcels.map((parcel) => (
                <View key={parcel.id} style={styles.parcelCard}>
                  <View style={styles.parcelTopRow}>
                    <View style={styles.parcelPin}>
                      <Text style={styles.parcelPinText}>⌖</Text>
                    </View>
                    <View style={styles.parcelIdentity}>
                      <Text style={styles.parcelId}>DEMO DATA · {parcel.name}</Text>
                      <Text style={styles.parcelLocation}>
                        {parcel.location}
                      </Text>
                    </View>
                    <View style={styles.demoScore}>
                      <Text style={styles.demoScoreNumber}>
                        {parcel.suitability_score}
                      </Text>
                      <Text style={styles.demoScoreLabel}>DEMO SCORE</Text>
                    </View>
                  </View>
                  <View style={styles.parcelDivider} />
                  <View style={styles.parcelDetails}>
                    <View>
                      <Text style={styles.detailLabel}>AREA</Text>
                      <Text style={styles.detailValue}>
                        {parcel.area_m2.toLocaleString()} m²
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.detailLabel}>ASKING PRICE</Text>
                      <Text style={styles.detailValue}>
                        €{parcel.price_eur.toLocaleString()}
                      </Text>
                    </View>
                    <Text style={styles.scoreDisclaimer}>
                      Score is illustrative only
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          <View style={styles.requestsSection}>
            <View style={styles.resultsHeadingRow}>
              <View>
                <Text style={styles.resultsEyebrow}>SAVED REQUESTS</Text>
                <Text style={styles.resultsTitle}>Investment requests</Text>
              </View>
            </View>
            {isLoadingRequests && (
              <Text style={styles.stateText}>Loading saved requests...</Text>
            )}
            {!isLoadingRequests && requestsError && (
              <View>
                <Text style={styles.errorText}>{requestsError}</Text>
                <Pressable
                  accessibilityRole="button"
                  onPress={() => void fetchRequests()}
                  style={styles.retryButton}
                >
                  <Text style={styles.retryButtonText}>Try again</Text>
                </Pressable>
              </View>
            )}
            {!isLoadingRequests && !requestsError && requests.length === 0 && (
              <Text style={styles.stateText}>No saved requests yet.</Text>
            )}
            {!isLoadingRequests && !requestsError && requests.length > 0 &&
              requests.map((request) => (
                <View key={request.id} style={styles.requestCard}>
                  <View style={styles.requestCardHeader}>
                    <Text style={styles.requestType}>
                      {request.investment_type}
                    </Text>
                    <Text style={styles.requestDate}>
                      {new Date(request.created_at).toLocaleDateString()}
                    </Text>
                  </View>
                  <Text style={styles.requestLocation}>{request.location}</Text>
                  <Text style={styles.requestBudget}>
                    Budget: €{request.budget_eur.toLocaleString()}
                  </Text>
                </View>
              ))}
          </View>

          <View style={styles.disclaimer}>
            <Text style={styles.disclaimerMark}>i</Text>
            <Text style={styles.disclaimerText}>
              Early prototype using demonstration data. Parcel details and
              suitability scores are not verified.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const COLORS = {
  background: '#FFFFFF',
  white: '#FFFFFF',
  navy: '#17324D',
  blue: '#2F6FE4',
  blueDark: '#245BBF',
  blueSoft: '#EDF4FF',
  green: '#3A9271',
  greenSoft: '#E8F4EE',
  text: '#31465C',
  muted: '#7B8A9B',
  line: '#E8EDF3',
  placeholder: '#A8B3C0',
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  flex: {
    flex: 1,
  },
  content: {
    width: '100%',
    maxWidth: 560,
    alignSelf: 'center',
    paddingHorizontal: 22,
    paddingTop: 16,
    paddingBottom: 28,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,
  },
  brandMark: {
    width: 38,
    height: 38,
    borderRadius: 13,
    backgroundColor: COLORS.navy,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  brandMarkInner: {
    width: 13,
    height: 17,
    borderWidth: 2,
    borderColor: '#B8E1CC',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
    transform: [{ rotate: '45deg' }],
  },
  brandName: {
    color: COLORS.navy,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.15,
  },
  brandRegion: {
    color: COLORS.muted,
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 2.3,
    marginTop: 2,
  },
  prototypeTag: {
    marginLeft: 'auto',
    borderColor: '#DCE8DF',
    borderWidth: 1,
    backgroundColor: '#F0F7F2',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  prototypeTagText: {
    color: COLORS.green,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  hero: {
    marginBottom: 22,
  },
  eyebrow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  eyebrowDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: COLORS.green,
    marginRight: 7,
  },
  eyebrowText: {
    color: COLORS.green,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.4,
  },
  title: {
    color: COLORS.navy,
    fontSize: 31,
    lineHeight: 37,
    fontWeight: '800',
    letterSpacing: -0.8,
    maxWidth: 390,
  },
  subtitle: {
    color: COLORS.muted,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 9,
    maxWidth: 390,
  },
  formCard: {
    backgroundColor: COLORS.white,
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: '#EDF1F5',
    shadowColor: '#1C3551',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.055,
    shadowRadius: 18,
    elevation: 2,
  },
  sectionHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionNumber: {
    color: COLORS.blue,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.8,
    marginRight: 9,
  },
  sectionTitle: {
    color: COLORS.navy,
    fontSize: 16,
    fontWeight: '700',
  },
  investmentOptions: {
    flexDirection: 'row',
    gap: 9,
    marginBottom: 21,
  },
  investmentOption: {
    flex: 1,
    minHeight: 79,
    paddingHorizontal: 6,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.line,
    borderRadius: 14,
    backgroundColor: COLORS.white,
  },
  investmentOptionSelected: {
    backgroundColor: COLORS.blueSoft,
    borderColor: '#BBD3FB',
  },
  optionIcon: {
    color: '#8090A2',
    fontSize: 23,
    fontWeight: '600',
    lineHeight: 27,
    marginBottom: 4,
  },
  optionIconSelected: {
    color: COLORS.blue,
  },
  optionLabel: {
    color: COLORS.muted,
    fontSize: 10,
    fontWeight: '600',
  },
  optionLabelSelected: {
    color: COLORS.blueDark,
    fontWeight: '700',
  },
  fieldGroup: {
    marginBottom: 18,
  },
  fieldLabel: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 9,
  },
  locationOptions: {
    flexDirection: 'row',
    gap: 8,
  },
  locationOption: {
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 9,
    backgroundColor: '#F5F7FA',
    borderWidth: 1,
    borderColor: '#F0F2F5',
  },
  locationOptionSelected: {
    backgroundColor: COLORS.greenSoft,
    borderColor: '#CDE6D7',
  },
  locationOptionText: {
    color: COLORS.muted,
    fontSize: 12,
    fontWeight: '600',
  },
  locationOptionTextSelected: {
    color: '#267554',
    fontWeight: '700',
  },
  helperText: {
    color: COLORS.muted,
    fontSize: 10,
    marginTop: 7,
  },
  criteriaRow: {
    flexDirection: 'row',
    gap: 11,
  },
  criteriaField: {
    flex: 1,
    minWidth: 0,
    marginBottom: 18,
  },
  inputWrap: {
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 11,
    borderWidth: 1,
    borderColor: COLORS.line,
    paddingHorizontal: 11,
    backgroundColor: '#FCFDFE',
  },
  input: {
    flex: 1,
    minWidth: 0,
    paddingVertical: 10,
    color: COLORS.navy,
    fontSize: 13,
  },
  inputPrefix: {
    color: COLORS.muted,
    fontSize: 13,
    fontWeight: '600',
    marginRight: 5,
  },
  inputSuffix: {
    color: COLORS.muted,
    fontSize: 11,
    fontWeight: '600',
    marginLeft: 5,
  },
  findButton: {
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    backgroundColor: COLORS.blue,
    shadowColor: COLORS.blue,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 9,
    elevation: 3,
  },
  findButtonPressed: {
    backgroundColor: COLORS.blueDark,
    transform: [{ scale: 0.99 }],
  },
  findButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.15,
  },
  findButtonArrow: {
    color: COLORS.white,
    fontSize: 19,
    marginLeft: 10,
    marginTop: -2,
  },
  buttonNote: {
    color: COLORS.muted,
    fontSize: 10,
    textAlign: 'center',
    marginTop: 10,
  },
  formMessage: {
    color: COLORS.green,
    fontSize: 11,
    lineHeight: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  resultsSection: {
    marginTop: 27,
  },
  resultsHeadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  resultsEyebrow: {
    color: COLORS.green,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1.3,
    marginBottom: 4,
  },
  resultsTitle: {
    color: COLORS.navy,
    fontSize: 21,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  demoBadge: {
    backgroundColor: '#FFF5E7',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  demoBadgeText: {
    color: '#A66D19',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.7,
  },
  resultsDescription: {
    color: COLORS.muted,
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 13,
  },
  parcelCard: {
    backgroundColor: COLORS.white,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: '#EDF1F5',
    padding: 15,
    marginBottom: 10,
  },
  parcelTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  parcelPin: {
    width: 37,
    height: 37,
    borderRadius: 12,
    backgroundColor: COLORS.greenSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  parcelPinText: {
    color: COLORS.green,
    fontSize: 21,
  },
  parcelIdentity: {
    flex: 1,
    minWidth: 0,
  },
  parcelId: {
    color: COLORS.blue,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  parcelLocation: {
    color: COLORS.navy,
    fontSize: 12,
    fontWeight: '600',
  },
  demoScore: {
    alignItems: 'center',
    marginLeft: 8,
  },
  demoScoreNumber: {
    color: COLORS.navy,
    fontSize: 17,
    fontWeight: '800',
  },
  demoScoreLabel: {
    color: COLORS.green,
    fontSize: 7,
    fontWeight: '800',
    letterSpacing: 0.45,
    marginTop: 2,
  },
  parcelDivider: {
    height: 1,
    backgroundColor: COLORS.line,
    marginVertical: 12,
  },
  parcelDetails: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  detailLabel: {
    color: COLORS.muted,
    fontSize: 8,
    fontWeight: '700',
    letterSpacing: 0.6,
    marginBottom: 4,
  },
  detailValue: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: '700',
  },
  scoreDisclaimer: {
    color: COLORS.muted,
    fontSize: 9,
    fontStyle: 'italic',
  },
  requestsSection: {
    marginTop: 27,
  },
  stateText: {
    color: COLORS.muted,
    fontSize: 12,
    lineHeight: 18,
  },
  errorText: {
    color: '#B34747',
    fontSize: 12,
    lineHeight: 18,
  },
  retryButton: {
    alignSelf: 'flex-start',
    marginTop: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: COLORS.blueSoft,
  },
  retryButtonText: {
    color: COLORS.blueDark,
    fontSize: 11,
    fontWeight: '700',
  },
  requestCard: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#EDF1F5',
    padding: 14,
    marginBottom: 9,
  },
  requestCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  requestType: {
    color: COLORS.navy,
    fontSize: 13,
    fontWeight: '700',
  },
  requestDate: {
    color: COLORS.muted,
    fontSize: 10,
  },
  requestLocation: {
    color: COLORS.text,
    fontSize: 12,
    marginTop: 7,
  },
  requestBudget: {
    color: COLORS.green,
    fontSize: 12,
    fontWeight: '700',
    marginTop: 5,
  },
  disclaimer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 21,
    paddingHorizontal: 3,
  },
  disclaimerMark: {
    width: 16,
    height: 16,
    borderRadius: 8,
    overflow: 'hidden',
    textAlign: 'center',
    color: COLORS.green,
    backgroundColor: COLORS.greenSoft,
    fontSize: 10,
    fontWeight: '800',
    lineHeight: 16,
    marginRight: 8,
  },
  disclaimerText: {
    flex: 1,
    color: COLORS.muted,
    fontSize: 10,
    lineHeight: 15,
  },
});
