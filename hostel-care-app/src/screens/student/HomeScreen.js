import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl, Animated } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import ScreenWrapper from '../../components/ScreenWrapper';
import colors from '../../utils/colors';
import { getData, STORAGE_KEYS } from '../../utils/helpers';
import { LinearGradient } from 'expo-linear-gradient';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const StatCard = ({ number, label, gradientColors, icon, delay = 0 }) => {
  const [scaleAnim] = useState(new Animated.Value(0));

  React.useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      tension: 50,
      friction: 7,
      delay,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.statCard, { transform: [{ scale: scaleAnim }] }]}>
      <LinearGradient
        colors={gradientColors}
        style={styles.statCardGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.statIcon}>{icon}</Text>
        <Text style={styles.statNumber}>{number}</Text>
        <Text style={styles.statLabel}>{label}</Text>
      </LinearGradient>
    </Animated.View>
  );
};

const ActionCard = ({ title, description, icon, onPress, delay = 0 }) => {
  const [scaleAnim] = useState(new Animated.Value(1));
  const [slideAnim] = useState(new Animated.Value(50));
  const [opacityAnim] = useState(new Animated.Value(0));

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 400,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <AnimatedTouchable
      style={[
        styles.actionCard,
        {
          transform: [{ scale: scaleAnim }, { translateX: slideAnim }],
          opacity: opacityAnim,
        },
      ]}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={1}
    >
      <View style={styles.actionCardIconContainer}>
        <Text style={styles.actionCardIcon}>{icon}</Text>
      </View>
      <View style={styles.actionCardContent}>
        <Text style={styles.actionCardTitle}>{title}</Text>
        <Text style={styles.actionCardDescription}>{description}</Text>
      </View>
      <View style={styles.actionCardArrowContainer}>
        <Text style={styles.actionCardArrow}>→</Text>
      </View>
    </AnimatedTouchable>
  );
};

const StudentHomeScreen = ({ navigation }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [stats, setStats] = useState({ total: 0, submitted: 0, inProgress: 0, resolved: 0 });
  const [refreshing, setRefreshing] = useState(false);
  const [headerAnim] = useState(new Animated.Value(0));

  const loadData = async () => {
    const user = await getData('@currentUser');
    setCurrentUser(user);

    const complaints = await getData(STORAGE_KEYS.COMPLAINTS) || [];
    const myComplaints = complaints.filter(c => c.studentId === user?.id);
    
    const submitted = myComplaints.filter(c => c.status === 'open').length;
    const inProgress = myComplaints.filter(c => c.status === 'in-progress').length;
    const resolved = myComplaints.filter(c => c.status === 'resolved').length;

    setStats({
      total: myComplaints.length,
      submitted,
      inProgress,
      resolved,
    });
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
      Animated.timing(headerAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }).start();
    }, [])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const handleCreateComplaint = () => {
    navigation.navigate('AddComplaint');
  };

  return (
    <ScreenWrapper>
      <ScrollView 
        style={styles.container}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <LinearGradient
          colors={[colors.primary, colors.primary + 'DD']}
          style={styles.header}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Animated.View
            style={{
              opacity: headerAnim,
              transform: [{
                translateY: headerAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-20, 0],
                }),
              }],
            }}
          >
            <Text style={styles.greeting}>👋 Hello, {currentUser?.name || 'Student'}</Text>
            <Text style={styles.subGreeting}>How can we help you today?</Text>
          </Animated.View>
        </LinearGradient>

        <View style={styles.statsContainer}>
          <StatCard
            number={stats.submitted}
            label="Submitted"
            gradientColors={['#3B82F6', '#2563EB']}
            icon="📤"
            delay={100}
          />
          <StatCard
            number={stats.inProgress}
            label="In Progress"
            gradientColors={['#F59E0B', '#D97706']}
            icon="⏳"
            delay={200}
          />
          <StatCard
            number={stats.resolved}
            label="Resolved"
            gradientColors={['#10B981', '#059669']}
            icon="✅"
            delay={300}
          />
        </View>

        <TouchableOpacity
          style={styles.createButton}
          onPress={handleCreateComplaint}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={[colors.primary, colors.primary + 'DD']}
            style={styles.createButtonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <View style={styles.createButtonIconCircle}>
              <Text style={styles.createButtonIcon}>✨</Text>
            </View>
            <View style={styles.createButtonTextContainer}>
              <Text style={styles.createButtonText}>Create New Complaint</Text>
              <Text style={styles.createButtonSubtext}>Report an issue quickly</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <View style={styles.sectionIconCircle}>
                <Text style={styles.sectionIcon}>📋</Text>
              </View>
              <Text style={styles.sectionTitle}>Quick Actions</Text>
            </View>
          </View>

          <ActionCard
            title="My Complaints"
            description="Track status and updates on your submissions"
            icon="📝"
            onPress={() => navigation.navigate('MyComplaintsNav')}
            delay={400}
          />

          <ActionCard
            title="Browse All Complaints"
            description="View and upvote complaints from other students"
            icon="🔍"
            onPress={() => navigation.navigate('BrowseComplaintsNav')}
            delay={500}
          />
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    padding: 24,
    paddingTop: 60,
    paddingBottom: 32,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.white,
    marginBottom: 6,
    letterSpacing: -0.5,
  },
  subGreeting: {
    fontSize: 15,
    color: colors.white + 'DD',
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 24,
    gap: 12,
    marginTop: -20,
  },
  statCard: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  statCardGradient: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.white,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.white + 'EE',
    textAlign: 'center',
    fontWeight: '600',
  },
  createButton: {
    margin: 20,
    marginTop: 24,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  createButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingVertical: 24,
  },
  createButtonIconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  createButtonIcon: {
    fontSize: 28,
  },
  createButtonTextContainer: {
    flex: 1,
  },
  createButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.white,
    marginBottom: 4,
  },
  createButtonSubtext: {
    fontSize: 13,
    color: colors.white + 'CC',
    fontWeight: '500',
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 8,
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary + '15',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  sectionIcon: {
    fontSize: 18,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  actionCard: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: colors.border + '40',
  },
  actionCardIconContainer: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: colors.primary + '10',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  actionCardIcon: {
    fontSize: 24,
  },
  actionCardContent: {
    flex: 1,
  },
  actionCardTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  actionCardDescription: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
    fontWeight: '500',
  },
  actionCardArrowContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary + '10',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  actionCardArrow: {
    fontSize: 20,
    color: colors.primary,
    fontWeight: '700',
  },
  bottomPadding: {
    height: 24,
  },
});