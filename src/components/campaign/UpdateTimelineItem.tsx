import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { CheckCircle2 } from 'lucide-react-native';
import { CampaignUpdate } from '../../types';
import { THEME_COLORS } from '../../config/constants';

interface UpdateTimelineItemProps {
  update: CampaignUpdate;
  isLast?: boolean;
}

export const UpdateTimelineItem: React.FC<UpdateTimelineItemProps> = ({ update, isLast = false }) => {
  return (
    <View style={styles.container}>
      <View style={styles.timelineColumn}>
        <View style={styles.bullet}>
          <CheckCircle2 size={16} color={THEME_COLORS.primary} />
        </View>
        {!isLast && <View style={styles.line} />}
      </View>

      <View style={styles.contentColumn}>
        <Text style={styles.date}>{update.date}</Text>
        <Text style={styles.title}>{update.title}</Text>
        <Text style={styles.text}>{update.text}</Text>
        {update.image ? (
          <Image source={{ uri: update.image }} style={styles.image} resizeMode="cover" />
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 12,
  },
  timelineColumn: {
    alignItems: 'center',
    width: 20,
  },
  bullet: {
    backgroundColor: '#ffffff',
    zIndex: 2,
  },
  line: {
    width: 2,
    flex: 1,
    backgroundColor: '#e2e8f0',
    marginVertical: 4,
  },
  contentColumn: {
    flex: 1,
    paddingBottom: 20,
  },
  date: {
    fontSize: 11,
    fontWeight: '700',
    color: THEME_COLORS.primary,
    marginBottom: 2,
  },
  title: {
    fontSize: 14,
    fontWeight: '800',
    color: THEME_COLORS.textPrimary,
    marginBottom: 4,
  },
  text: {
    fontSize: 13,
    color: THEME_COLORS.textSecondary,
    lineHeight: 18,
  },
  image: {
    width: '100%',
    height: 140,
    borderRadius: 12,
    marginTop: 8,
  },
});
