import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },

  background: {
    flexGrow: 1,
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
    width: 36,
    height: 36,
  },

  gigaIcon: {
    width: 54,
    height: 54,
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
    right: 0,
    bottom: 0,
    zIndex: 2,
    minWidth: 30,
    minHeight: 30,
    margin: 5,
  },
});

export default styles;
