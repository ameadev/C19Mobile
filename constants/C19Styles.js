import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  contentContainer: {
    paddingTop: 30,
  },
  
  tabBarInfoContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      ...Platform.select({
        ios: {
          shadowColor: 'black',
          shadowOffset: { width: 0, height: -3 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
        },
        android: {
          elevation: 20,
        },
      }),
      alignItems: 'center',
      backgroundColor: '#fbfbfb',
      paddingVertical: 20,
    },

    button: {
        alignItems: "center",
        backgroundColor: "#ffd942",
        padding: 10,
        margin: 10,
        ...Platform.select({
          ios: {
            shadowColor: 'black',
            shadowOffset: { width: 3, height: 3 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
          },
          android: {
            elevation: 20,
          },
        }),
        borderRadius: 5
    },

    buttonText: {
        fontSize: 17,
        fontWeight: "bold",
        color: "#ffffff"
    },
  });