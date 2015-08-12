import _ from 'lodash';

import listStyle from './components/list-style';
import detailsStyle from './components/details-style';

export default _.assign(
    {
        body: {
            margin: '0px'
        }
    },
    listStyle, detailsStyle
);
