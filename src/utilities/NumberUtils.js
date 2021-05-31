import { format } from 'quasar'
const { pad } = format;

/**
 * Do the ff: add padding
 * @param number
 * @param options {pad: number}
 * @returns {number}
 */
export const formatNumber = (number, options = {}) =>
{
    if(!number)
    {
        number = 0;
    }

    let formatted_number = parseFloat(number);

    if(options && options instanceof Object)
    {

        // Format with decimal
        if(options.hasOwnProperty('decimal') || options.hasOwnProperty('currency'))
        {
            const currency     = options.hasOwnProperty('currency') ? options.currency : null;

            const to_fixed_num = options.hasOwnProperty('decimal')
                ? options.decimal
                    : !currency
                ? null
                    : ['BTC','XAU', 'UNIQ'].includes(currency)
                ? 8
                    : ['PHP', 'USD'].includes(currency)
                ? 2
                    : ['ETH'].includes(currency)
                ? 18
                    : null;

            formatted_number = to_fixed_num ? formatted_number.toFixed(to_fixed_num) : formatted_number
        }

        formatted_number = formatted_number.toString().replace(/[^\d.,]/g, '');

        // Format with padding
        if(options.hasOwnProperty('pad'))
        {
            formatted_number = pad(formatted_number , options.pad);
        }

        // Format Digit
        const formatDigit = (num) => {
            const num_str  = String(num).split(".");
            const real_num = num_str[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
            const dec_num  = num_str[1] ? num_str[1] : '';

            if(options.hasOwnProperty('decimal'))
            {
                return [real_num, dec_num].join('.')
            }
            else
            {
                return [real_num, dec_num].join('')
            }
            
        };
        formatted_number = formatDigit(formatted_number);

        // Format with padding
        if(options.hasOwnProperty('currency'))
        {
            const currency   = options.currency === 'XAU' ? 'UNIQ' : options.currency;
            formatted_number = formatted_number + " " + currency;
        }
    }

    return formatted_number;
};

