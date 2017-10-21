import { NgorPropertyPipe } from './property.pipe';

describe('NgorPropertyPipe', () => {
  let pipe: NgorPropertyPipe;

  beforeEach(() => pipe = new NgorPropertyPipe());

  describe('When no model', () => {
    it('Should return an empty string', () => {
      expect(pipe.transform()).toBe('');
    });
  });

  describe('When no property', () => {
    it('Should return an empty string', () => {
      expect(pipe.transform({ foo: 'bar' })).toBe('');
    });
  });

  describe('When root property', () => {
    it('Should return the property value', () => {
      expect(pipe.transform({ foo: 'bar' }, 'foo')).toBe('bar');
    });
  });

  describe('When nested property', () => {
    it('Should return the property value', () => {
      expect(pipe.transform({ foo: { bar: 'quux' } }, 'foo.bar')).toBe('quux');
    });
  });

  describe('When property does not exist', () => {
    it('Should return an empty string', () => {
      expect(pipe.transform({ foo: { bar: 'quux' } }, 'foo.plop')).toBe('');
    });
  });

  describe('When nested objects are null', () => {
    it('Should return an empty string', () => {
      expect(pipe.transform({ foo: null }, 'foo.bar')).toBe('');
    });
  });

  describe('When property is a boolean', () => {
    it('Should return a boolean string', () => {
      expect(pipe.transform({ foo: { bar: 'false' } }, 'foo.bar')).toBe('false');
    });
  });
});
