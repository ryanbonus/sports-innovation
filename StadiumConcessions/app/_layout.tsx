import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform, Image } from 'react-native';
import { Stack } from 'expo-router';

interface Game {
  name: string;
  date: string;
  homeTeam: {
    name: string;
    score: string;
  };
  awayTeam: {
    name: string;
    score: string;
  };
}

export default function Layout() {
  const [currentGame, setCurrentGame] = useState<Game | null>(null);

  useEffect(() => {
    fetchKennesawGames();
  }, []);

  const fetchKennesawGames = async () => {
    try {
      const response = await fetch('https://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard');
      const data = await response.json();
      
      const ksuGame = data.events?.find((event: any) => 
        event.name.includes('Kennesaw State') ||
        event.competitions[0]?.competitors?.some((team: any) => 
          team.team.location === 'Kennesaw State' || 
          team.team.name === 'Owls'
        )
      );

      if (ksuGame) {
        const homeTeam = ksuGame.competitions[0].competitors.find((team: any) => team.homeAway === 'home');
        const awayTeam = ksuGame.competitions[0].competitors.find((team: any) => team.homeAway === 'away');
        
        setCurrentGame({
          name: ksuGame.name,
          date: ksuGame.date,
          homeTeam: {
            name: homeTeam.team.displayName,
            score: homeTeam.score || '0'
          },
          awayTeam: {
            name: awayTeam.team.displayName,
            score: awayTeam.score || '0'
          }
        });
      }
    } catch (error) {
      console.error('Error fetching game data:', error);
    }
  };

  return (
    <>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#2D2926',
          },
          headerTintColor: '#ffc629',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitle: () => (
            <View style={styles.headerContainer}>
              <Image 
                source={require('../assets/images/ksu_logo.png')} 
                style={styles.logo}
              />
            </View>
          ),
        }}
      />
      {currentGame && (
        <View style={styles.gameContainer}>
          <Text style={styles.gameDetails}>
            Kennesaw State ({currentGame.awayTeam.score}) @ Wake Forest ({currentGame.homeTeam.score})
          </Text>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 65,
    width: '100%',
  },
  logo: {
    width: 150,
    height: 65,
    resizeMode: 'contain',
  },
  gameContainer: {
    position: 'absolute',
    top: Platform.OS === 'web' ? 20 : 40,
    right: 20,
    zIndex: 1000,
  },
  gameDetails: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'right',
  },
});
