import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  button: {
    backgroundColor: '#c0c0c0',
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#606060',
    padding: 3,
    paddingHorizontal: 5,
    margin: 5,
  },

  input: {

  },

  icon: {
    margin: 2,
  },

  smallIcon: {
    width: 12,
    resizeMode: 'contain',
    margin: 2,
  },

  mediumIcon: {
    width: 18,
    resizeMode: 'contain',
  },

  bigIcon: {
    width: 24,
    resizeMode: 'contain',
  },

  list: {
    width: '100%',
    padding: 4,
  },

  listItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flexGrow: 1,
    width: '100%',
    borderColor: '#A0A0A0',
    borderWidth: 2,
    borderRadius: 8,
    backgroundColor: '#D0D0D0',
    marginVertical: 2,
    paddingVertical: 1,
    paddingHorizontal: 6,
  },

  border: {
    borderColor: 'red',
    borderWidth: 2,
  },

  floatTopLeft: {
    position: 'absolute',
    left: 0,
    top: -10,
  },
});

export default styles;
