import React from "react";
import Select from 'react-select';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "-components/Grid/GridItem.jsx";
import GridContainer from "-components/Grid/GridContainer.jsx";
import CustomInput from "-components/CustomInput/CustomInput.jsx";
import Button from "-components/CustomButtons/Button.jsx";
import Card from "-components/Card/Card.jsx";
import CardHeader from "-components/Card/CardHeader.jsx";
import CardBody from "-components/Card/CardBody.jsx";
import CardFooter from "-components/Card/CardFooter.jsx";
import PropTypes from "prop-types";

const styles = {
    cardCategoryWhite: {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0"
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none"
    }
};

class CreateNewDialogue extends React.Component {
    constructor(props) {
        super(props);
        let data = {};
        props.inputFields.forEach((field) => {
            data[field.name] = field.value || '';
        })
        this.state = data;
    }

    cancel = () => {
        this.props.onCancel()
    };

    save = () => {
        let data = {};
        Object.keys(this.state).forEach(k => {
            data[k] = this.state[k];
            if(data[k].value) {
                data[k] = data[k].value;
            }
        });
        console.log(data);
        this.props.onSave(data);
    };

    onChange = (field) => (e) => {
        let changed = {};
        changed[field] = e.currentTarget.value;
        this.setState(changed);
    };

    getLabel = (field) => {
        return field.label ? field.label : field.name.charAt(0).toUpperCase() + field.name.slice(1);
    };
    
    getInputType = field => {
        if(!field.type) {
            return 'text';
        }
        if(field.type === 'phone') {
            return 'number';
        }
        return field.type;
    }

    isValid = (field) => {
        let validateFunc = (v) => true;
        if (field.validation) {
            validateFunc = field.validation;
        } else {
            let t = field.type ? field.type.toLowerCase() : '';
            switch (t) {
                case 'password':
                    validateFunc = v => v.length >= 8;
                    break;
                case 'number':
                    validateFunc = v => v.length && /^\d+$/.test(v);
                    break;
                case 'phone':
                    validateFunc = v => v.length && /^\d{11}$/.test(v);
                    break;
                case 'email':
                    validateFunc = v => v.length && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
                    break;
                default:
                    validateFunc = (v) => {
                        let value = v;
                        if(v.value) {
                            value = v.value;
                        }
                        return !!value;
                    }
            }
        }
        return validateFunc(this.state[field.name]);
    }

    render() {
        const { classes } = this.props;
        return (<GridContainer alignItems="center" justify={"center"}>
            <GridItem xs={12} sm={12} md={8}>
                <Card>
                    <CardHeader color="primary">
                        <h4 className={classes.cardTitleWhite}>{this.props.title}</h4>
                        <p className={classes.cardCategoryWhite}>{this.props.subtitle || ''}</p>
                    </CardHeader>
                    <CardBody>
                        <GridContainer>
                            {this.props.inputFields.map((field) => {
                                // selection list
                                if (field.options) {
                                    return <GridItem gridClass={field.hide && 'hide'} key={field.name} xs={12} sm={12} md={12}> 
                                    <Select
                                        className='form-selection'
                                        options={field.options}
                                        onChange={(opt) => {
                                            this.setState({[field.name]: opt});
                                            this.isValid(field);
                                        }}
                                        placeholder={this.getLabel(field)}
                                        value={this.state[field.name]}
                                    />
                                    </GridItem>;
                                }
                                return (
                                    <GridItem gridClass={field.hide && 'hide'} key={field.name} xs={12} sm={12} md={12}>
                                        <CustomInput
                                            labelText={this.getLabel(field)}
                                            id={field.name.replace(/ /, '-')}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            error={this.state[field.name] ? !this.isValid(field) : undefined}
                                            success={this.state[field.name] ? this.isValid(field) : undefined}
                                            inputProps={{
                                                type: this.getInputType(field),
                                                value: this.state[field.name],
                                                onChange: this.onChange(field.name),
                                                placeholder: field.placeholder || ''
                                            }}
                                        />
                                    </GridItem>
                                );
                            })}

                        </GridContainer>
                    </CardBody>
                    <CardFooter>
                        <Button onClick={this.cancel}>Cancel</Button>
                        <Button
                            disabled={
                                !this.props.inputFields.reduce((preValue, curValue) => {
                                    return !!preValue && this.isValid(curValue);
                                }, true)
                            }
                            onClick={this.save}
                            color="primary"
                        >Save</Button>
                    </CardFooter>
                </Card>
            </GridItem>
        </GridContainer>);
    }
}

CreateNewDialogue.propTypes = {
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    inputFields: PropTypes.array,
    title: PropTypes.string,
};

export default withStyles(styles)(CreateNewDialogue);
