import {ScrollView} from 'react-native';

interface IScrollView {
  children: any;
  inlineStyle?: any;
  className?: string;
  nestedScrollEnabled?:boolean;
}

const ScrollViewComponent = (props: IScrollView) => {
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
     {...props}
      contentContainerStyle={
        props.inlineStyle ? props.inlineStyle : {paddingBottom: 40}
      }
      className={`${props.className} h-full w-full`}>
      {props.children}
    </ScrollView>
  );
};

export default ScrollViewComponent;
