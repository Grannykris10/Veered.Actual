import React, { useMemo, useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, StatusBar } from 'react-native';

const CITY_COORDS = {
  'Los Angeles, CA': { lat: 34.0522, lon: -118.2437 },
  'Phoenix, AZ': { lat: 33.4484, lon: -112.0740 },
  'Apache Junction, AZ': { lat: 33.4150, lon: -111.5496 },
  'Holbrook, AZ': { lat: 34.9022, lon: -110.1582 },
  'Dragoon, AZ': { lat: 32.0248, lon: -110.0365 },
  'Tombstone, AZ': { lat: 31.7129, lon: -110.0676 },
  'Oracle, AZ': { lat: 32.6100, lon: -110.7700 },
  'Winslow, AZ': { lat: 35.0242, lon: -110.6974 },
  'Roswell, NM': { lat: 33.3943, lon: -104.5230 },
  'Carlsbad, NM': { lat: 32.4207, lon: -104.2288 },
  'Pie Town, NM': { lat: 34.2981, lon: -108.1392 },
  'Albuquerque, NM': { lat: 35.0844, lon: -106.6504 },
  'Socorro, NM': { lat: 34.0584, lon: -106.8914 },
  'Alamogordo, NM': { lat: 32.8995, lon: -105.9603 },
  'Amarillo, TX': { lat: 35.2220, lon: -101.8313 },
  'Terlingua, TX': { lat: 29.3241, lon: -103.5291 },
  'Marfa, TX': { lat: 30.3091, lon: -104.0206 },
  'Valentine, TX': { lat: 30.5871, lon: -104.4996 },
  'Lubbock, TX': { lat: 33.5779, lon: -101.8552 },
  'Nelson, NV': { lat: 35.7105, lon: -114.8308 },
};

const PLACES = [
  { id: '1', title: 'Superstition Mountains Cougar Shadow View', state: 'Arizona', category: 'Scenic Overlook', city: 'Apache Junction', cityKey: 'Apache Junction, AZ', milesFromRoute: 8, description: 'A famous Apache Junction shadow phenomenon on the Superstitions that looks like a cougar or coyote.', whyStop: 'Desert folklore becomes a real visual moment when the light hits just right.', bestFor: 'sunset timing, local-lore lovers' },
  { id: '2', title: 'Petrified Forest National Park', state: 'Arizona', category: 'Roadside History', city: 'Holbrook', cityKey: 'Holbrook, AZ', milesFromRoute: 20, description: 'Fossilized wood, painted desert views, and old Route 66 traces all in one stop.', whyStop: 'A perfect strange-history road trip stop.', bestFor: 'Route 66 fans, photographers' },
  { id: '3', title: 'Goldfield Ghost Town', state: 'Arizona', category: 'Ghost Town', city: 'Apache Junction', cityKey: 'Apache Junction, AZ', milesFromRoute: 14, description: 'An easy old-west detour with dramatic scenery and ghost-town vibes.', whyStop: 'Low effort, high atmosphere.', bestFor: 'quick adventure, old-west fans' },
  { id: '4', title: 'The Thing?', state: 'Arizona', category: 'Roadside Oddity', city: 'Dragoon', cityKey: 'Dragoon, AZ', milesFromRoute: 6, description: 'Classic strange-roadside-America energy with mystery and silliness.', whyStop: 'Every route needs at least one gloriously weird stop.', bestFor: 'quick stop, laughs' },
  { id: '5', title: 'Pioneer Cemetery', state: 'Arizona', category: 'Cemetery', city: 'Phoenix', cityKey: 'Phoenix, AZ', milesFromRoute: 9, description: 'A historic cemetery packed with local stories, legends, and old desert history.', whyStop: 'Perfect for eerie, reflective detours.', bestFor: 'ghost stories, twilight visits' },
  { id: '6', title: 'Roswell UFO Museum Area', state: 'New Mexico', category: 'Alien/UFO', city: 'Roswell', cityKey: 'Roswell, NM', milesFromRoute: 18, description: 'The classic alien-town detour with museums, kitsch, and UFO culture everywhere.', whyStop: 'Required if your app loves weird Americana.', bestFor: 'alien fans, novelty hunters' },
  { id: '7', title: 'Carlsbad Caverns', state: 'New Mexico', category: 'Cave', city: 'Carlsbad', cityKey: 'Carlsbad, NM', milesFromRoute: 24, description: 'An unforgettable underground stop with huge chambers and dramatic cave scenery.', whyStop: 'A true wow-factor nature stop.', bestFor: 'families, explorers' },
  { id: '8', title: 'Pie Town', state: 'New Mexico', category: 'Weird Eats', city: 'Pie Town', cityKey: 'Pie Town, NM', milesFromRoute: 21, description: 'A small quirky stop made memorable by its name and road-trip pie energy.', whyStop: 'Charming, odd, and very on-brand for Veered.', bestFor: 'foodie detours, quirky-town lovers' },
  { id: '9', title: 'Cadillac Ranch', state: 'Texas', category: 'Roadside Oddity', city: 'Amarillo', cityKey: 'Amarillo, TX', milesFromRoute: 10, description: 'One of the most iconic roadside art stops in the country.', whyStop: 'Instant recognition and classic road-trip weirdness.', bestFor: 'photos, families' },
  { id: '10', title: 'Terlingua Ghost Town', state: 'Texas', category: 'Ghost Town', city: 'Terlingua', cityKey: 'Terlingua, TX', milesFromRoute: 27, description: 'A desert ghost town with ruins, history, and strong off-grid atmosphere.', whyStop: 'It feels cinematic, remote, and unforgettable.', bestFor: 'desert trips, photographers' },
  { id: '11', title: 'Marfa Lights Viewing Area', state: 'Texas', category: 'Alien/UFO', city: 'Marfa', cityKey: 'Marfa, TX', milesFromRoute: 16, description: 'A mysterious West Texas stop tied to unexplained light sightings.', whyStop: 'Mystery, desert beauty, and cult road-trip appeal.', bestFor: 'night stops, mystery lovers' },
  { id: '12', title: 'Prada Marfa', state: 'Texas', category: 'Roadside Oddity', city: 'Valentine', cityKey: 'Valentine, TX', milesFromRoute: 12, description: 'A famous fake Prada storefront sitting unexpectedly in the desert.', whyStop: 'Surreal, funny, artsy, and instantly memorable.', bestFor: 'photos, art lovers' },
  { id: '13', title: 'Biosphere 2', state: 'Arizona', category: 'Roadside History', city: 'Oracle', cityKey: 'Oracle, AZ', milesFromRoute: 17, description: 'A strange and fascinating science stop with giant glass ecosystems.', whyStop: 'It feels futuristic and weird in the best way.', bestFor: 'science lovers, families' },
  { id: '14', title: 'Tombstone Bird Cage Theatre', state: 'Arizona', category: 'Ghost Town', city: 'Tombstone', cityKey: 'Tombstone, AZ', milesFromRoute: 13, description: 'One of the most legendary haunted old-west locations in Arizona.', whyStop: 'Ghost stories, western history, and drama all together.', bestFor: 'haunted-history fans' },
  { id: '15', title: 'Meteor Crater', state: 'Arizona', category: 'Roadside History', city: 'Winslow', cityKey: 'Winslow, AZ', milesFromRoute: 11, description: 'A massive meteor impact site that feels almost unreal when you see it in person.', whyStop: 'One of those places that makes a road trip feel epic.', bestFor: 'space lovers, families' },
  { id: '16', title: 'White Sands National Park', state: 'New Mexico', category: 'Scenic Overlook', city: 'Alamogordo', cityKey: 'Alamogordo, NM', milesFromRoute: 23, description: 'Miles of bright white dunes that feel dreamlike and totally different from a normal desert stop.', whyStop: 'Beautiful and surreal.', bestFor: 'sunset visits, photographers' },
  { id: '17', title: 'Nelson Ghost Town', state: 'Nevada', category: 'Ghost Town', city: 'Nelson', cityKey: 'Nelson, NV', milesFromRoute: 28, description: 'A rough-edged old mining stop with vintage props and dramatic scenery.', whyStop: 'It feels cinematic without feeling polished.', bestFor: 'photos, western vibes' },
];

const CATEGORIES = ['All','Ghost Town','Cemetery','Roadside History','Movie Location','Weird Eats','Roadside Oddity','Scenic Overlook','Alien/UFO','Cave'];

const toRadians = (v) => (v * Math.PI) / 180;
function haversineMiles(a, b) {
  const R = 3958.8;
  const dLat = toRadians(b.lat - a.lat);
  const dLon = toRadians(b.lon - a.lon);
  const lat1 = toRadians(a.lat);
  const lat2 = toRadians(b.lat);
  const x = Math.sin(dLat / 2) ** 2 + Math.sin(dLon / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  return R * (2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x)));
}
function distancePointToSegmentMiles(point, start, end) {
  const px = point.lon, py = point.lat, x1 = start.lon, y1 = start.lat, x2 = end.lon, y2 = end.lat;
  const dx = x2 - x1, dy = y2 - y1;
  if (dx === 0 && dy === 0) return haversineMiles(point, start);
  let t = ((px - x1) * dx + (py - y1) * dy) / (dx * dx + dy * dy);
  t = Math.max(0, Math.min(1, t));
  return haversineMiles(point, { lon: x1 + t * dx, lat: y1 + t * dy });
}
const estimateExtraMiles = (offRouteMiles) => Math.round(offRouteMiles * 2.2);

function PlaceCard({ place, isSaved, onToggleSave, onViewDetails }) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{place.title}</Text>
        <TouchableOpacity onPress={() => onToggleSave(place.id)} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>{isSaved ? 'Saved ♥' : 'Save ♡'}</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.cardMeta}>{place.city}, {place.state} • {place.category}</Text>
      <Text style={styles.cardMiles}>{place.calculatedOffRouteMiles} miles off path</Text>
      <Text style={styles.cardExtraMiles}>About +{place.extraDriveMiles} driving miles added</Text>
      <Text style={styles.cardDescription}>{place.description}</Text>
      <TouchableOpacity style={styles.detailsButton} onPress={() => onViewDetails(place)}>
        <Text style={styles.detailsButtonText}>View Stop</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [savedIds, setSavedIds] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchText, setSearchText] = useState('');
  const [startPoint, setStartPoint] = useState('Los Angeles, CA');
  const [endPoint, setEndPoint] = useState('Phoenix, AZ');
  const [maxDetourMiles, setMaxDetourMiles] = useState('25');
  const [selectedStop, setSelectedStop] = useState(null);

  const routeStart = CITY_COORDS[startPoint];
  const routeEnd = CITY_COORDS[endPoint];
  const routeDistance = routeStart && routeEnd ? Math.round(haversineMiles(routeStart, routeEnd)) : null;
  const detourLimit = Number(maxDetourMiles) || 0;

  const enrichedPlaces = useMemo(() => PLACES.map((place) => {
    const coords = CITY_COORDS[place.cityKey];
    let calculatedOffRouteMiles = place.milesFromRoute;
    if (routeStart && routeEnd && coords) calculatedOffRouteMiles = Math.round(distancePointToSegmentMiles(coords, routeStart, routeEnd));
    return { ...place, calculatedOffRouteMiles, extraDriveMiles: estimateExtraMiles(calculatedOffRouteMiles) };
  }), [routeStart, routeEnd]);

  const filteredPlaces = useMemo(() => {
    let results = [...enrichedPlaces];
    if (selectedCategory !== 'All') results = results.filter((place) => place.category === selectedCategory);
    if (searchText.trim()) {
      const q = searchText.toLowerCase();
      results = results.filter((place) => [place.title, place.city, place.state, place.category, place.description].some((v) => v.toLowerCase().includes(q)));
    }
    if (detourLimit > 0) results = results.filter((place) => place.calculatedOffRouteMiles <= detourLimit);
    return results.sort((a, b) => a.calculatedOffRouteMiles - b.calculatedOffRouteMiles);
  }, [enrichedPlaces, selectedCategory, searchText, detourLimit]);

  const savedPlaces = enrichedPlaces.filter((place) => savedIds.includes(place.id));
  const savedExtraMilesTotal = savedPlaces.reduce((sum, place) => sum + place.extraDriveMiles, 0);

  const toggleSave = (id) => setSavedIds((prev) => prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]);
  const goToTab = (tab) => { setSelectedStop(null); setCurrentScreen(tab); };
  const detourQuickSet = (value) => setMaxDetourMiles(String(value));

  const Home = () => (
    <ScrollView contentContainerStyle={styles.screenContent}>
      <Text style={styles.heroTitle}>Veered</Text>
      <Text style={styles.heroSubtitle}>Find the stops worth leaving the route for.</Text>
      <View style={styles.heroBox}>
        <Text style={styles.heroBoxTitle}>What Veered helps you find</Text>
        <Text style={styles.heroBoxText}>Hidden gems, ghost towns, cemeteries, weird eats, movie-like places, caves, roadside oddities, and the kind of stops you would never think to search for.</Text>
      </View>
      <View style={styles.heroStatRow}>
        <View style={styles.heroStatBox}><Text style={styles.heroStatNumber}>{PLACES.length}</Text><Text style={styles.heroStatLabel}>Stops loaded</Text></View>
        <View style={styles.heroStatBox}><Text style={styles.heroStatNumber}>{CATEGORIES.length - 1}</Text><Text style={styles.heroStatLabel}>Categories</Text></View>
      </View>
      <View style={styles.routeSummaryBox}>
        <Text style={styles.routeSummaryTitle}>Current route setup</Text>
        <Text style={styles.routeSummaryText}>{startPoint} → {endPoint}</Text>
        <Text style={styles.routeSummarySubtext}>{routeDistance ? `Approx direct route: ${routeDistance} miles` : 'Enter supported cities to estimate route miles.'}</Text>
      </View>
      <TouchableOpacity style={styles.primaryButton} onPress={() => goToTab('discover')}><Text style={styles.primaryButtonText}>Start Exploring</Text></TouchableOpacity>
      <TouchableOpacity style={styles.secondaryButton} onPress={() => goToTab('trip')}><Text style={styles.secondaryButtonText}>Plan a Trip</Text></TouchableOpacity>
    </ScrollView>
  );

  const Discover = () => (
    <ScrollView contentContainerStyle={styles.screenContent}>
      <Text style={styles.screenTitle}>Discover</Text>
      <TextInput value={searchText} onChangeText={setSearchText} placeholder="Search city, state, category, or stop" placeholderTextColor="#777" style={styles.input} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipRow}>
        {CATEGORIES.map((category) => {
          const active = selectedCategory === category;
          return <TouchableOpacity key={category} onPress={() => setSelectedCategory(category)} style={[styles.chip, active && styles.chipActive]}><Text style={[styles.chipText, active && styles.chipTextActive]}>{category}</Text></TouchableOpacity>;
        })}
      </ScrollView>
      <View style={styles.detourBox}>
        <Text style={styles.detourTitle}>Max miles off path</Text>
        <TextInput value={maxDetourMiles} onChangeText={setMaxDetourMiles} keyboardType="numeric" placeholder="25" placeholderTextColor="#777" style={styles.detourInput} />
        <View style={styles.quickRow}>{[10, 25, 50, 100].map((value) => <TouchableOpacity key={value} style={styles.quickChip} onPress={() => detourQuickSet(value)}><Text style={styles.quickChipText}>{value} mi</Text></TouchableOpacity>)}</View>
      </View>
      <Text style={styles.resultsText}>{filteredPlaces.length} stops found</Text>
      {filteredPlaces.map((place) => <PlaceCard key={place.id} place={place} isSaved={savedIds.includes(place.id)} onToggleSave={toggleSave} onViewDetails={setSelectedStop} />)}
    </ScrollView>
  );

  const Trip = () => (
    <ScrollView contentContainerStyle={styles.screenContent}>
      <Text style={styles.screenTitle}>Trip Planner</Text>
      <TextInput value={startPoint} onChangeText={setStartPoint} placeholder="Starting point" placeholderTextColor="#777" style={styles.input} />
      <TextInput value={endPoint} onChangeText={setEndPoint} placeholder="Destination" placeholderTextColor="#777" style={styles.input} />
      <TextInput value={maxDetourMiles} onChangeText={setMaxDetourMiles} placeholder="Max detour miles" placeholderTextColor="#777" keyboardType="numeric" style={styles.input} />
      <View style={styles.routeBox}>
        <Text style={styles.routeBoxTitle}>Current Route</Text>
        <Text style={styles.routeBoxText}>{startPoint} → {endPoint}</Text>
        <Text style={styles.routeBoxSubtext}>{routeDistance ? `Approx direct route: ${routeDistance} miles` : 'Type a supported city like Los Angeles, CA or Phoenix, AZ.'}</Text>
        <Text style={styles.routeBoxSubtext}>Showing stops within {detourLimit || 0} miles off your path.</Text>
      </View>
      <Text style={styles.sectionLabel}>Best matching detours</Text>
      {filteredPlaces.slice(0, 10).map((place) => <PlaceCard key={place.id} place={place} isSaved={savedIds.includes(place.id)} onToggleSave={toggleSave} onViewDetails={setSelectedStop} />)}
    </ScrollView>
  );

  const Saved = () => (
    <ScrollView contentContainerStyle={styles.screenContent}>
      <Text style={styles.screenTitle}>Saved Stops</Text>
      <View style={styles.savedSummaryBox}>
        <Text style={styles.savedSummaryTitle}>Trip board summary</Text>
        <Text style={styles.savedSummaryText}>{savedPlaces.length} saved stop{savedPlaces.length === 1 ? '' : 's'}</Text>
        <Text style={styles.savedSummarySubtext}>Approx extra miles if you did them all: +{savedExtraMilesTotal}</Text>
      </View>
      {savedPlaces.length === 0 ? <View style={styles.emptyState}><Text style={styles.emptyStateTitle}>No saved spots yet</Text><Text style={styles.emptyStateText}>Save a few stops and this becomes your trip board.</Text></View> : savedPlaces.map((place) => <PlaceCard key={place.id} place={place} isSaved={true} onToggleSave={toggleSave} onViewDetails={setSelectedStop} />)}
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.appBody}>
        {currentScreen === 'home' && <Home />}
        {currentScreen === 'discover' && <Discover />}
        {currentScreen === 'trip' && <Trip />}
        {currentScreen === 'saved' && <Saved />}
      </View>
      {selectedStop && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalCategory}>{selectedStop.category}</Text>
            <Text style={styles.modalTitle}>{selectedStop.title}</Text>
            <Text style={styles.modalText}>{selectedStop.description}</Text>
            <Text style={styles.modalLabel}>Miles off your path</Text>
            <Text style={styles.modalText}>{selectedStop.calculatedOffRouteMiles} miles</Text>
            <Text style={styles.modalLabel}>Estimated extra driving</Text>
            <Text style={styles.modalText}>About +{selectedStop.extraDriveMiles} miles</Text>
            <Text style={styles.modalLabel}>Why stop here</Text>
            <Text style={styles.modalText}>{selectedStop.whyStop}</Text>
            <Text style={styles.modalLabel}>Best for</Text>
            <Text style={styles.modalText}>{selectedStop.bestFor}</Text>
            <TouchableOpacity style={styles.primaryButton} onPress={() => toggleSave(selectedStop.id)}><Text style={styles.primaryButtonText}>{savedIds.includes(selectedStop.id) ? 'Saved to Trip' : 'Add to Trip'}</Text></TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton} onPress={() => setSelectedStop(null)}><Text style={styles.secondaryButtonText}>Close</Text></TouchableOpacity>
          </View>
        </View>
      )}
      <View style={styles.navBar}>
        {['home', 'discover', 'trip', 'saved'].map((tab) => <TouchableOpacity key={tab} onPress={() => goToTab(tab)} style={styles.navItem} activeOpacity={0.8}><Text style={[styles.navText, currentScreen === tab && styles.navTextActive]}>{tab.charAt(0).toUpperCase() + tab.slice(1)}</Text></TouchableOpacity>)}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0d0d0d' },
  appBody: { flex: 1 },
  screenContent: { padding: 18, paddingBottom: 24, flexGrow: 1 },
  heroTitle: { fontSize: 38, fontWeight: '800', color: '#ffffff', marginTop: 10, marginBottom: 8 },
  heroSubtitle: { fontSize: 18, color: '#d0d0d0', marginBottom: 20, lineHeight: 25 },
  heroBox: { backgroundColor: '#171717', borderRadius: 18, padding: 16, marginBottom: 14 },
  heroBoxTitle: { color: '#ffffff', fontSize: 18, fontWeight: '700', marginBottom: 8 },
  heroBoxText: { color: '#cfcfcf', fontSize: 15, lineHeight: 24 },
  heroStatRow: { flexDirection: 'row', gap: 12, marginBottom: 18 },
  heroStatBox: { flex: 1, backgroundColor: '#171717', borderRadius: 16, padding: 14 },
  heroStatNumber: { color: '#ffffff', fontSize: 24, fontWeight: '800', marginBottom: 4 },
  heroStatLabel: { color: '#bcbcbc', fontSize: 13 },
  routeSummaryBox: { backgroundColor: '#171717', borderRadius: 18, padding: 16, marginBottom: 18 },
  routeSummaryTitle: { color: '#ffffff', fontSize: 16, fontWeight: '800', marginBottom: 6 },
  routeSummaryText: { color: '#ffffff', fontSize: 15, marginBottom: 4 },
  routeSummarySubtext: { color: '#bcbcbc', lineHeight: 20 },
  primaryButton: { backgroundColor: '#f3f3f3', borderRadius: 14, paddingVertical: 14, alignItems: 'center', marginBottom: 10 },
  primaryButtonText: { color: '#111111', fontSize: 16, fontWeight: '800' },
  secondaryButton: { borderWidth: 1, borderColor: '#525252', borderRadius: 14, paddingVertical: 14, alignItems: 'center', marginTop: 8 },
  secondaryButtonText: { color: '#ffffff', fontSize: 16, fontWeight: '700' },
  screenTitle: { color: '#ffffff', fontSize: 30, fontWeight: '800', marginBottom: 14 },
  input: { backgroundColor: '#171717', color: '#ffffff', borderRadius: 14, paddingHorizontal: 14, paddingVertical: 14, marginBottom: 12, fontSize: 15 },
  chipRow: { marginBottom: 12 },
  chip: { borderWidth: 1, borderColor: '#404040', paddingVertical: 10, paddingHorizontal: 14, borderRadius: 999, marginRight: 10, backgroundColor: '#151515' },
  chipActive: { backgroundColor: '#f2f2f2', borderColor: '#f2f2f2' },
  chipText: { color: '#ededed', fontWeight: '600' },
  chipTextActive: { color: '#111111' },
  detourBox: { backgroundColor: '#171717', borderRadius: 18, padding: 14, marginBottom: 12 },
  detourTitle: { color: '#ffffff', fontSize: 16, fontWeight: '800', marginBottom: 10 },
  detourInput: { backgroundColor: '#111111', color: '#ffffff', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, fontSize: 15, marginBottom: 10 },
  quickRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  quickChip: { backgroundColor: '#252525', borderRadius: 999, paddingVertical: 8, paddingHorizontal: 12 },
  quickChipText: { color: '#ffffff', fontWeight: '700', fontSize: 12 },
  resultsText: { color: '#a9a9a9', marginBottom: 12, fontSize: 13, fontWeight: '600' },
  sectionLabel: { color: '#ffffff', fontSize: 16, fontWeight: '700', marginBottom: 12 },
  card: { backgroundColor: '#171717', borderRadius: 18, padding: 16, marginBottom: 14 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 },
  cardTitle: { color: '#ffffff', fontSize: 18, fontWeight: '800', flex: 1, paddingRight: 10 },
  saveButton: { paddingVertical: 7, paddingHorizontal: 11, borderRadius: 999, backgroundColor: '#252525' },
  saveButtonText: { color: '#ffffff', fontWeight: '700', fontSize: 12 },
  cardMeta: { color: '#d0d0d0', marginBottom: 6, fontSize: 14, lineHeight: 20 },
  cardMiles: { color: '#ffffff', marginBottom: 4, fontWeight: '800', fontSize: 14 },
  cardExtraMiles: { color: '#cfcfcf', marginBottom: 8, fontWeight: '600', fontSize: 13 },
  cardDescription: { color: '#d4d4d4', fontSize: 14, lineHeight: 22 },
  detailsButton: { marginTop: 12, backgroundColor: '#f3f3f3', borderRadius: 12, paddingVertical: 11, alignItems: 'center' },
  detailsButtonText: { color: '#111111', fontWeight: '800' },
  routeBox: { backgroundColor: '#171717', borderRadius: 16, padding: 16, marginBottom: 14 },
  routeBoxTitle: { color: '#ffffff', fontSize: 16, fontWeight: '800', marginBottom: 6 },
  routeBoxText: { color: '#ffffff', fontSize: 15, marginBottom: 5 },
  routeBoxSubtext: { color: '#bcbcbc', fontSize: 13, lineHeight: 20, marginBottom: 3 },
  savedSummaryBox: { backgroundColor: '#171717', borderRadius: 18, padding: 16, marginBottom: 14 },
  savedSummaryTitle: { color: '#ffffff', fontSize: 16, fontWeight: '800', marginBottom: 6 },
  savedSummaryText: { color: '#ffffff', fontSize: 15, marginBottom: 4 },
  savedSummarySubtext: { color: '#bcbcbc', lineHeight: 20 },
  emptyState: { backgroundColor: '#171717', borderRadius: 18, padding: 18 },
  emptyStateTitle: { color: '#ffffff', fontSize: 18, fontWeight: '800', marginBottom: 6 },
  emptyStateText: { color: '#d0d0d0', lineHeight: 22 },
  navBar: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#242424', backgroundColor: '#101010', paddingVertical: 12 },
  navItem: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 6 },
  navText: { color: '#8f8f8f', fontWeight: '600', fontSize: 14 },
  navTextActive: { color: '#ffffff', fontWeight: '800' },
  modalOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.72)', justifyContent: 'center', padding: 18 },
  modalCard: { backgroundColor: '#171717', borderRadius: 20, padding: 20 },
  modalCategory: { color: '#bcbcbc', marginBottom: 6, fontSize: 13 },
  modalTitle: { color: '#ffffff', fontSize: 24, fontWeight: '800', marginBottom: 10 },
  modalLabel: { color: '#ffffff', fontSize: 16, fontWeight: '800', marginTop: 14, marginBottom: 6 },
  modalText: { color: '#d4d4d4', lineHeight: 22 },
});
